import torch
import numpy as np
import cv2
import imageio
import base64
from io import BytesIO
from PIL import Image

from model_registry import device
from model import slerp

# =========================
# PREPROCESS
# =========================

def preprocess_image_ae(img):
    img = img.convert("L")
    img = np.array(img)

    # invert if needed
    if np.mean(img) > 127:
        img = 255 - img

    # threshold
    _, img = cv2.threshold(img, 50, 255, cv2.THRESH_BINARY)

    # resize directly to 28x28
    img = cv2.resize(img, (28, 28))

    img = img / 255.0

    tensor = torch.tensor(img, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
    return tensor

def preprocess_image(img):
    img = img.convert("L")
    img = np.array(img)

    # 1. Strong contrast normalization
    img = cv2.normalize(img, None, 0, 255, cv2.NORM_MINMAX)

    # 2. Invert if needed
    if np.mean(img) > 127:
        img = 255 - img

    # 3. Strong threshold (IMPORTANT)
    _, img = cv2.threshold(img, 80, 255, cv2.THRESH_BINARY)

    # 4. Morphological clean (removes noise)
    kernel = np.ones((3,3), np.uint8)
    img = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)

    # 5. Find bounding box
    coords = cv2.findNonZero(img)
    if coords is not None:
        x, y, w, h = cv2.boundingRect(coords)
        img = img[y:y+h, x:x+w]

    # 6. Resize while preserving aspect
    img = cv2.resize(img, (48, 48))

    # 7. Center in 64x64
    padded = np.zeros((64, 64), dtype=np.uint8)
    padded[8:56, 8:56] = img

    # 8. Normalize
    padded = padded / 255.0

    return torch.tensor(padded, dtype=torch.float32).unsqueeze(0).unsqueeze(0).to(device)

# =========================
# MORPH
# =========================

def generate_morph(model, config, imgA, imgB, steps=50, return_frames=False):

    if config["type"] == "ae":
        imgA = preprocess_image_ae(imgA)
        imgB = preprocess_image_ae(imgB)
    else:
        imgA = preprocess_image(imgA)
        imgB = preprocess_image(imgB)
        
    # =====================
    # ENCODE
    # =====================
    with torch.no_grad():
        if config["type"] == "vae":
            muA, _ = model.encode(imgA)
            muB, _ = model.encode(imgB)
        else:  # autoencoder
            muA = model.encoder(imgA)
            muB = model.encoder(imgB)

    frames = []
    encoded_frames = []

    for t in np.linspace(0, 1, steps):

        # =====================
        # INTERPOLATION
        # =====================
        if config["type"] == "vae":
            z = slerp(muA, muB, t)
        else:
            z = (1 - t) * muA + t * muB   # LERP for AE

        # =====================
        # DECODE
        # =====================
        with torch.no_grad():
            if config["type"] == "vae":
                recon = model.decode(z)
            else:
                recon = model.decoder(z)

        img = recon.cpu().squeeze().numpy()
        img = (img - img.min()) / (img.max() - img.min() + 1e-8)
        img = (img * 255).astype(np.uint8)

        up = cv2.resize(img, None, fx=4, fy=4, interpolation=cv2.INTER_CUBIC)
        frames.append(up)

        if return_frames:
            pil_img = Image.fromarray(up)
            buffer = BytesIO()
            pil_img.save(buffer, format="PNG")
            encoded_frames.append(
                base64.b64encode(buffer.getvalue()).decode("utf-8")
            )

    # =====================
    # GIF
    # =====================
    gif_buffer = BytesIO()
    imageio.mimsave(gif_buffer, frames, format="GIF", fps=10)
    gif_base64 = base64.b64encode(gif_buffer.getvalue()).decode("utf-8")

    if return_frames:
        return {"gif": gif_base64, "frames": encoded_frames}
    else:
        return {"gif": gif_base64}

# =========================
# LATENT DECODE
# =========================

def decode_latent(model, z):

    z = torch.tensor(z, dtype=torch.float32).unsqueeze(0).to(device)

    with torch.no_grad():
        recon = model.decode(z)

    img = recon.cpu().squeeze().numpy()
    img = (img - img.min()) / (img.max() - img.min() + 1e-8)
    img = (img * 255).astype(np.uint8)

    up = cv2.resize(img, None, fx=4, fy=4, interpolation=cv2.INTER_CUBIC)

    pil_img = Image.fromarray(up)
    buffer = BytesIO()
    pil_img.save(buffer, format="PNG")

    # encode to base64
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {
        "image": encoded
    }
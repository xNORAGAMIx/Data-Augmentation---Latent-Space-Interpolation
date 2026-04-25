import torch
import numpy as np
import cv2
import imageio
import base64
from io import BytesIO
from PIL import Image
from pydantic import BaseModel
import numpy as np

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from model import ConvVAE64, slerp

# =========================
# CONFIG
# =========================

LATENT_DIM = 64
device = torch.device("cpu")

# =========================
# APP SETUP
# =========================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cpu")

# =========================
# LOAD MODEL
# =========================

model = ConvVAE64().to(device)
model.load_state_dict(torch.load("vae_gan.pth", map_location=device))
model.eval()

# =========================
# PREPROCESS
# =========================

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
# CORE PIPELINE
# =========================

def generate_morph(imgA, imgB, steps=50, return_frames=False):

    imgA = preprocess_image(imgA)
    imgB = preprocess_image(imgB)

    with torch.no_grad():
        muA, _ = model.encode(imgA)
        muB, _ = model.encode(imgB)

    frames = []
    encoded_frames = []

    for t in np.linspace(0, 1, steps):

        z = slerp(muA, muB, t)

        with torch.no_grad():
            recon = model.decode(z)

        img = recon.cpu().squeeze().numpy()

        # normalize
        img = (img - img.min()) / (img.max() - img.min() + 1e-8)
        img = (img * 255).astype(np.uint8)

        # upscale
        up = cv2.resize(img, None, fx=4, fy=4, interpolation=cv2.INTER_CUBIC)

        frames.append(up)

        # encode to base64 if needed
        if return_frames:
            pil_img = Image.fromarray(up)
            buffer = BytesIO()
            pil_img.save(buffer, format="PNG")
            encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
            encoded_frames.append(encoded)

    # save GIF
    gif_path = "output.gif"
    imageio.mimsave(gif_path, frames, fps=10)

    if return_frames:
        return gif_path, encoded_frames
    else:
        return gif_path

# =========================
# API ENDPOINT
# =========================

@app.post("/morph")
async def morph(
    imgA: UploadFile = File(...),
    imgB: UploadFile = File(...),
    steps: int = Form(50),
    return_frames: bool = Form(False)
):

    imageA = Image.open(imgA.file)
    imageB = Image.open(imgB.file)

    result = generate_morph(
        imageA,
        imageB,
        steps=steps,
        return_frames=return_frames
    )

    # return frames + gif path
    if return_frames:
        gif_path, frames = result

        return JSONResponse({
            "gif": gif_path,
            "frames": frames
        })

    # return only GIF
    else:
        gif_path = result
        return FileResponse(gif_path, media_type="image/gif")

# =========================
# LATENT DECODE ENDPOINT
# =========================

class LatentRequest(BaseModel):
    z: list

@app.post("/decode")
def decode_latent(req: LatentRequest):

    # SAFETY CHECK
    if len(req.z) != LATENT_DIM:
        return {"error": f"Expected latent dim {LATENT_DIM}, got {len(req.z)}"}

    z = torch.tensor(req.z, dtype=torch.float32).unsqueeze(0).to(device)

    with torch.no_grad():
        recon = model.decode(z)

    img = recon.cpu().squeeze().numpy()
    img = (img - img.min()) / (img.max() - img.min() + 1e-8)
    img = (img * 255).astype(np.uint8)

    up = cv2.resize(img, None, fx=4, fy=4, interpolation=cv2.INTER_CUBIC)

    # encode image
    pil_img = Image.fromarray(up)
    buffer = BytesIO()
    pil_img.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return {"image": encoded}
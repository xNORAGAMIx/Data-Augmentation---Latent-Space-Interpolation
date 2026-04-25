import torch
from PIL import Image
import numpy as np
import cv2
import imageio

# import your model + slerp
from model import ConvVAE64, slerp   

device = torch.device("cpu")

# load model
model = ConvVAE64().to(device)
model.load_state_dict(torch.load("vae_gan.pth", map_location=device))
model.eval()

# preprocessing
def preprocess_image(img):
    img = img.convert("L")
    img = img.resize((64, 64))
    img = np.array(img) / 255.0
    img = torch.tensor(img, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
    return img.to(device)

# core function
def generate_morph(imgA, imgB, steps=50, return_frames=False):

    imgA = preprocess_image(imgA)
    imgB = preprocess_image(imgB)

    with torch.no_grad():
        muA, _ = model.encode(imgA)
        muB, _ = model.encode(imgB)

    frames = []

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

    # save GIF
    gif_path = "output.gif"
    imageio.mimsave(gif_path, frames, fps=10)

    print("GIF saved as output.gif")

    if return_frames:
        return gif_path, frames
    else:
        return gif_path


# test with images
imgA = Image.open("digit1.png")
imgB = Image.open("digit2.png")

generate_morph(imgA, imgB)

gif_path, frames = generate_morph(imgA, imgB, return_frames=True)

import os

os.makedirs("augmented", exist_ok=True)

for i, frame in enumerate(frames):
    imageio.imwrite(f"augmented/frame_{i}.png", frame)

print("Frames saved in /augmented")
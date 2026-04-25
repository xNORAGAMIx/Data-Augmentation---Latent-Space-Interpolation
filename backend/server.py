from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image

from model_registry import get_model
from inference import generate_morph, decode_latent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# MORPH
# =========================

@app.post("/morph")
async def morph(
    imgA: UploadFile = File(...),
    imgB: UploadFile = File(...),
    model_name: str = Form("vae_gan"),
    steps: int = Form(50),
    return_frames: bool = Form(False)
):

    model, config = get_model(model_name)

    imageA = Image.open(imgA.file)
    imageB = Image.open(imgB.file)

    result = generate_morph(
        model,
        config,
        imageA,
        imageB,
        steps=steps,
        return_frames=return_frames
    )

    return JSONResponse(result)

# =========================
# LATENT
# =========================

class LatentRequest(BaseModel):
    z: list
    model_name: str = "vae_gan"

@app.post("/decode")
def decode(req: LatentRequest):

    model, _ = get_model(req.model_name)

    return decode_latent(model, req.z)
import torch
from model import Autoencoder, ConvVAE64

device = torch.device("cpu")

MODEL_REGISTRY = {
    "autoencoder": {
        "class": Autoencoder,
        "path": "models/autoencoder.pth",
        "type": "ae"
    },
    # "vae": {
    #     "class": VAE,
    #     "path": "models/vae.pth",
    #     "type": "vae"
    # },
    "conv_vae": {
        "class": ConvVAE64,
        "path": "models/conv_vae.pth",
        "type": "vae"
    },
    "vae_gan": {
        "class": ConvVAE64,
        "path": "models/vae_gan.pth",
        "type": "vae"
    }
}

_loaded_models = {}

def get_model(model_name):

    if model_name not in MODEL_REGISTRY:
        raise ValueError("Invalid model")

    if model_name in _loaded_models:
        return _loaded_models[model_name]

    config = MODEL_REGISTRY[model_name]

    model = config["class"]().to(device)
    model.load_state_dict(torch.load(config["path"], map_location=device))
    model.eval()

    _loaded_models[model_name] = (model, config)

    return model, config
import torch
import torch.nn as nn
import torch.nn.functional as F


# Autoencoder architecture inspired by https://arxiv.org/abs/1711.00117
class Autoencoder(nn.Module):
    def __init__(self):
        super().__init__()

        self.encoder = nn.Sequential(
            nn.Linear(28*28, 128),
            nn.ReLU(),
            nn.Linear(128, 64)
        )

        self.decoder = nn.Sequential(
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.Linear(128, 28*28),
            nn.Sigmoid()
        )

    def forward(self, x):
        x = x.view(-1, 28*28)
        z = self.encoder(x)
        out = self.decoder(z)
        return out.view(-1, 1, 28, 28)

# VAE-GAN architecture inspired by https://arxiv.org/abs/1711.00117
class ConvVAE64(nn.Module):

    def __init__(self):
        super().__init__()

        self.encoder = nn.Sequential(
            nn.Conv2d(1, 32, 4, 2, 1),
            nn.ReLU(),

            nn.Conv2d(32, 64, 4, 2, 1),
            nn.ReLU(),

            nn.Conv2d(64, 128, 4, 2, 1),
            nn.ReLU()
        )

        self.fc_mu = nn.Linear(128*8*8, 64)
        self.fc_logvar = nn.Linear(128*8*8, 64)

        self.fc_decode = nn.Linear(64, 128*8*8)

        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, 4, 2, 1),
            nn.ReLU(),

            nn.ConvTranspose2d(64, 32, 4, 2, 1),
            nn.ReLU(),

            nn.ConvTranspose2d(32, 1, 4, 2, 1),
            nn.Sigmoid()
        )

    def encode(self, x):
        h = self.encoder(x)
        h = h.view(-1, 128*8*8)
        return self.fc_mu(h), self.fc_logvar(h)

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        return mu + torch.randn_like(std) * std

    def decode(self, z):
        h = self.fc_decode(z)
        h = h.view(-1, 128, 8, 8)
        return self.decoder(h)

    def forward(self, x):
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        return self.decode(z), mu, logvar
    

def slerp(z1, z2, t):
    z1_norm = F.normalize(z1, dim=1)
    z2_norm = F.normalize(z2, dim=1)

    dot = torch.sum(z1_norm * z2_norm, dim=1, keepdim=True)
    dot = torch.clamp(dot, -1.0, 1.0)

    theta = torch.acos(dot)
    sin_theta = torch.sin(theta)

    factor1 = torch.sin((1 - t) * theta) / sin_theta
    factor2 = torch.sin(t * theta) / sin_theta

    return factor1 * z1 + factor2 * z2


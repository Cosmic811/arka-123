"""Download public model weights only. This script never reads project images."""
from pathlib import Path
from urllib.request import urlopen
import hashlib

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / '.cache/models'
MODELS = [
    ('depth-anything-v2-small.onnx', 'https://huggingface.co/onnx-community/depth-anything-v2-small/resolve/4472b7362082ad9968fee890ca0f1e5aca36b93d/onnx/model.onnx', 'afb6a5c28f3b6bf1618c6e43f02073ef9dfdc70e937502d51603e57b0a1df10c'),
    ('isnet-general-use.onnx', 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-general-use.onnx', '60920e99c45464f2ba57bee2ad08c919a52bbf852739e96947fbb4358c0d964a'),
]
DEST.mkdir(parents=True, exist_ok=True)
for name, url, expected in MODELS:
    target = DEST / name
    if target.exists() and hashlib.sha256(target.read_bytes()).hexdigest() == expected:
        print(name, 'verified cache')
        continue
    with urlopen(url, timeout=60) as response:
        data = response.read()
    if hashlib.sha256(data).hexdigest() != expected:
        raise RuntimeError(f'Checksum mismatch: {name}')
    target.write_bytes(data)
    print(name, len(data), 'bytes, SHA-256 verified')

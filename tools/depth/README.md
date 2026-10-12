# Offline media tools

Optional build-time tools; the website does not need Python, model weights or an ML server.

Python 3.12 (tested), CPU inference. Create an isolated environment outside frontend dependencies:

```powershell
python -m venv .cache/media-venv
.cache/media-venv/Scripts/python -m pip install -r tools/depth/requirements.txt
.cache/media-venv/Scripts/python tools/depth/download_models.py
$conceptDirectory = Read-Host 'Approved concept directory'
.cache/media-venv/Scripts/python tools/depth/prepare_media.py --concept-directory $conceptDirectory
```

The download script reads no photographs. It fetches two public ONNX checkpoints into ignored `.cache/models/` and verifies SHA-256. The preparation script runs without network access. Furniture composites require the approved workshop-concept.png and lecture-concept.png in a directory explicitly supplied by the operator; source materials are not included in this repository. Production WebP / PNG files are committed and need no regeneration.

Depth Anything V2 **Small**, Apache-2.0, ONNX conversion pinned to revision `4472b7362082ad9968fee890ca0f1e5aca36b93d`: [model](https://huggingface.co/onnx-community/depth-anything-v2-small), [authors](https://github.com/DepthAnything/Depth-Anything-V2). IS-Net general-use, Apache-2.0: [authors](https://github.com/xuebinqin/DIS); ONNX conversion distributed by [rembg](https://github.com/danielgatis/rembg). Preprocessing follows the model preprocessor config and rembg DisSession; the full rembg package and PyTorch are not needed.

Depth is relative inverse depth, not measured room geometry. A 128 × 80 browser mesh uses small depth displacement with a neutral-view compensation, a perspective camera and a 3.5% safety border. No background pixels are invented. Mobile, reduced motion, save-data, unsupported WebGL and explicit pause use the original static photo. Rendering sleeps outside the viewport / hidden document and when the camera is at rest.

Furniture finishing uses broad hand-selected masks around complete furniture and shadows, restoring the real photo outside these regions. The first mask was rejected because it clipped furniture; aspect-ratio-preserving fit and expanded masks fixed the defect. Pixel equality before WebP export is measured only outside the masks, not claimed for the full image or lossy export. Cutout changes alpha only; original face / clothing RGB are preserved before WebP encoding. Hair checked against both light and graphite backgrounds.

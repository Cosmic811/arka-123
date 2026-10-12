"""Offline inference and deterministic finishing. No image upload or remote code.

Run from the repository root with the optional ONNX dependencies on PYTHONPATH.
Model downloads and runtime live in ignored .cache/, never in frontend bundles.
"""
from pathlib import Path
import argparse
import hashlib
import json
import time
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import onnxruntime as ort

ROOT = Path(__file__).resolve().parents[2]
MODELS = ROOT / '.cache/models'
SPACE = ROOT / 'public/images/space'
HOST = ROOT / 'public/images/host'
QA = ROOT / 'docs/qa/final'
QA.mkdir(parents=True, exist_ok=True)

def session(name):
    options = ort.SessionOptions()
    options.intra_op_num_threads = 4
    return ort.InferenceSession(str(MODELS / name), options, providers=['CPUExecutionProvider'])

def depth():
    start = time.monotonic()
    image = Image.open(SPACE / 'room-wide.webp').convert('RGB')
    width = round(518 * image.width / image.height / 14) * 14
    pixels = np.asarray(image.resize((width, 518), Image.Resampling.BICUBIC), dtype=np.float32) / 255
    pixels = (pixels - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    model = session('depth-anything-v2-small.onnx')
    prediction = np.squeeze(model.run(None, {model.get_inputs()[0].name: pixels.transpose(2, 0, 1)[None].astype(np.float32)})[0])
    low, high = np.percentile(prediction, [1, 99])
    normalized = np.clip((prediction - low) / (high - low), 0, 1)
    result = Image.fromarray(np.uint8(normalized * 255)).resize((1000, 625), Image.Resampling.BICUBIC)
    result = result.filter(ImageFilter.MedianFilter(3)).filter(ImageFilter.GaussianBlur(0.65))
    result.save(SPACE / 'room-wide-depth.png', optimize=True)
    return {'model': 'Depth Anything V2 Small (ONNX)', 'input': list(image.size), 'inference': [width, 518], 'output': list(result.size), 'seconds': round(time.monotonic() - start, 1), 'meaning': 'relative inverse depth; white is nearer, not metric reconstruction'}

def cutout():
    start = time.monotonic()
    image = Image.open(HOST / 'host-main.webp').convert('RGB')
    pixels = np.asarray(image.resize((1024, 1024), Image.Resampling.LANCZOS), dtype=np.float32)
    pixels = pixels / max(float(pixels.max()), 1.0) - 0.5
    model = session('isnet-general-use.onnx')
    prediction = np.squeeze(model.run(None, {model.get_inputs()[0].name: pixels.transpose(2, 0, 1)[None]})[0])
    prediction = (prediction - prediction.min()) / (prediction.max() - prediction.min())
    mask = Image.fromarray(np.uint8(np.clip(prediction, 0, 1) * 255)).resize(image.size, Image.Resampling.LANCZOS)
    # Keep soft strands; remove only near-zero specks and nearly opaque holes.
    alpha = np.asarray(mask).copy()
    alpha[alpha < 3] = 0
    alpha[alpha > 252] = 255
    rgba = image.copy()
    rgba.putalpha(Image.fromarray(alpha))
    rgba.save(HOST / 'host-cutout.webp', quality=92, method=6, exact=True)
    # Review the original pixels over both light and dark backgrounds.
    contact = Image.new('RGB', (1200, 750), '#f4f1ea')
    preview = rgba.resize((600, 750), Image.Resampling.LANCZOS)
    contact.paste(preview, (0, 0), preview)
    contact.paste('#242722', (600, 0, 1200, 750))
    contact.paste(preview, (600, 0), preview)
    contact.save(QA / 'host-cutout-check.jpg', quality=92)
    mask.save(QA / 'host-alpha.png', optimize=True)
    return {'model': 'IS-Net general use', 'input': list(image.size), 'output': list(rgba.size), 'seconds': round(time.monotonic() - start, 1), 'rgb': 'original portrait pixels; alpha only, no face regeneration'}

def furniture(concept_directory):
    base = Image.open(SPACE / 'room-wide.webp').convert('RGB')
    # Hand-selected floor/furniture regions; all walls, arches, ceiling and
    # radiators outside these regions are restored directly from the real photo.
    polygons = {
        'workshop': [
            [(255, 650), (990, 630), (1010, 1125), (270, 1150)],
            [(980, 650), (1550, 635), (1590, 1249), (970, 1249)],
        ],
        'lecture': [
            [(215, 535), (405, 535), (415, 835), (205, 835)],
            [(185, 640), (1265, 630), (1270, 1225), (180, 1235)],
        ],
    }
    results = []
    for name, regions in polygons.items():
        with Image.open(concept_directory / f'{name}-concept.png') as source:
            candidate = ImageOps.fit(source.convert('RGB'), base.size, Image.Resampling.LANCZOS)
        mask = Image.new('L', base.size)
        draw = ImageDraw.Draw(mask)
        for polygon in regions:
            draw.polygon(polygon, fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(5))
        corrected = Image.composite(candidate, base, mask)
        corrected.save(SPACE / f'{name}-layout.webp', quality=92, method=6)
        comparison = Image.new('RGB', (1400, 510), '#f4f1ea')
        comparison.paste(base.resize((680, 425)), (10, 60))
        comparison.paste(corrected.resize((680, 425)), (710, 60))
        ImageDraw.Draw(comparison).text((20, 20), f'Real photo / {name}: original architecture restored outside furniture', fill='#242722')
        comparison.save(QA / f'{name}-geometry.jpg', quality=93)
        mask.resize((1000, 625)).save(QA / f'{name}-furniture-mask.png', optimize=True)
        # Quantization can change pixels by a few levels, so report a lossless
        # pre-export audit instead of claiming bit-identical lossy WebP output.
        outside = np.asarray(mask) == 0
        difference = np.abs(np.asarray(corrected).astype(float) - np.asarray(base).astype(float))
        results.append({'asset': name, 'unchanged_area_percent': round(float(outside.mean() * 100), 1), 'outside_mask_max_delta_before_webp': float(difference[outside].max())})
    return results

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Optional offline media preparation')
    parser.add_argument('--concept-directory', type=Path, required=True,
                        help='Directory containing the two approved furniture concept PNGs')
    args = parser.parse_args()
    report = {'depth': depth(), 'cutout': cutout(), 'furniture': furniture(args.concept_directory), 'runtime': ort.__version__, 'providers': ['CPUExecutionProvider']}
    report['files'] = [{'path': str(p.relative_to(ROOT)).replace('\\', '/'), 'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in [SPACE/'room-wide-depth.png', HOST/'host-cutout.webp', SPACE/'workshop-layout.webp', SPACE/'lecture-layout.webp']]
    (QA / 'local-media-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))

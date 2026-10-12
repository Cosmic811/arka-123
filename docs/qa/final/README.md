# Финальные доказательства

Production-сайт, Chromium, 11 октября 2026. Размеры — CSS viewport; изображения не включают scrollbar. [Полный QA](../../qa-report.md).

## Шесть ширин

| Width | Первый экран | Дополнительно |
| --- | --- | --- |
| 360 | [Hero](360-hero.jpg) | [персонаж](360-character.jpg) |
| 390 | [Hero](390-hero.jpg) | [персонаж](390-character.jpg) |
| 768 | [Hero](768-hero.jpg) | [Пространство](768-space.jpg) |
| 1024 | [Hero](1024-hero.jpg) | — |
| 1280 | [Hero](1280-hero.jpg) | — |
| 1440 | [Hero](1440-hero.jpg) | [Все секции ниже](#секции-и-сравнения) |

На 768 обычный viewport-снимок сохраняет правильный breakpoint. Full-page compositor уменьшал CSS-ширину до 753 и переключал mobile layout. Длинные full-page captures также иногда содержали пустые compositor tiles ниже sticky-сцены. Такие кадры исключены: итоговые доказательства используют обычные viewport-снимки и проверенные кадры секций. Точная геометрия подтверждается production-metrics.json.

## Секции и сравнения

[About](1440-about.jpg), [Depth / space](1440-depth.jpg), [Workshop](1440-workshop.jpg), [Lecture](1440-lecture.jpg), [Character desktop](1440-character.jpg), [Tariffs](1440-rates.jpg), [Gallery](1440-gallery.jpg), [Reviews](1440-reviews.jpg), [Inquiry](1440-inquiry.jpg), [Footer](1440-footer.jpg).

[Workshop vs original](workshop-geometry.jpg), [Lecture vs original](lecture-geometry.jpg), [cutout edges](host-cutout-check.jpg). Furniture mask PNG показывают области, в которых разрешены мебель и тени.

## Измерения

- [Production responsive / loaded assets](production-metrics.json).
- [Production console: 6 вкладок, warn/error пусты](production-console.json).
- [Локальный dev load CLS: 0 на шести ширинах](dev-load-metrics.json). Не production Lighthouse / полевая метрика.
- [Depth / cutout / восстановление фона](local-media-report.json).
- [Фактические размеры и байты активных assets](active-assets.json).

Reduced motion проверен по коду: runtime preference emulation не предоставлена браузером. Mobile и ручной static pause проверены в браузере. Снимки не являются измерением FPS или проверкой физических устройств.

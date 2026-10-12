# AI tools

Только фактически использованные AI-инструменты:

| Tool | Purpose | Result | Manual corrections | Subscription status |
| --- | --- | --- | --- | --- |
| Codex | Концепция, frontend, WebGL/motion, QA и документация | Готовый Next.js сайт | Проверка композиции, достоверности и поведения в браузере | Доступный инструмент; новых покупок не было |
| Built-in image generation | Персонаж и мебельные концепции | Один master, workshop / lecture | Настоящий фон восстановлен вне мебельных масок; лицо не генерировалось повторно | Доступный инструмент; точный model ID и тариф не заявляются |
| Depth Anything V2 Small, ONNX | Относительная inverse depth реального room-wide | Depth PNG 1000 × 625 | Мягкое сглаживание; ограничены displacement и камера | Open source, Apache-2.0; локально |
| IS-Net general-use, ONNX | Segmentation персонажа | Alpha cutout 1600 × 2000 | Проверка волос и жакета; RGB сохранён до WebP export | Open source, Apache-2.0; локально |

**Дополнительные расходы: 0 ₽.** Новые подписки и платные credits не покупались. Точная стоимость уже доступных инструментов не включается в дополнительные расходы.

Sharp и Pillow использованы для crop, WebP и масок; Chromium и npm checks - для проверки. Python и ML-модели не нужны для запуска сайта. Исходные фотографии не загружались в публичные Hugging Face Spaces.

Источники: [Depth Anything V2](https://github.com/DepthAnything/Depth-Anything-V2), [IS-Net / DIS](https://github.com/xuebinqin/DIS). Лицензии сохранены в [licenses](licenses/).

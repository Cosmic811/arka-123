# ARKA 123

Commercial test assignment for a fictional event-space brand.

## Demo

Live: [cosmic811.github.io/arka-123](https://cosmic811.github.io/arka-123/)

Repository: [Cosmic811/arka-123](https://github.com/Cosmic811/arka-123)

## Concept

«Встреча начинается с вида.» Архитектурный editorial-сайт: настоящее помещение, арочные окна, спокойная сетка. Фирменный персонаж появляется после знакомства с пространством.

## Implemented

1. Logo animation - предоставленный знак, preloader, hover и keyboard focus.
2. Brand character - один AI master, прозрачный cutout, сохранённое лицо.
3. Depth-based room presentation - реальная фотография, depth map и ограниченная 2.5D-сцена.
4. Scroll-driven character scene - персонаж в настоящем помещении, web-анимация и static fallback.
5. Full responsive website - форматы, расстановки, галерея/lightbox, тарифы, отзывы и demo-форма.

## Tech

Next.js App Router, React, TypeScript, Tailwind CSS, GSAP / ScrollTrigger, custom WebGL renderer. Локальные Onest / Prata. Публикация: GitHub Pages, static export.

## AI workflow

Codex, built-in image generation, Depth Anything V2 Small, IS-Net. Depth estimation и segmentation выполнялись локально. Дополнительные расходы: **0 ₽**.

## Time

Около **4 часов активной работы за два дня**. Приблизительная оценка разработки и интеграции.

## QA

**13 automated tests, 13 passed.** Lint, typecheck, production build и GitHub Pages deployment проходят. Responsive: 360 / 390 / 768 / 1024 / 1280 / 1440. [QA report](docs/qa-report.md).

## Running locally

Node.js **>=22.18.0**, рекомендуется Node.js 24, как в CI.

~~~sh
npm ci
npm run dev
~~~

Env, Python, ML-модели, backend и внешние AI API для запуска не нужны.

## Notes

- Компания вымышленная; цены и отзывы концептуальные.
- Demo-форма не отправляет и не сохраняет данные.
- Task #4 использует scroll-driven web scene. Отдельный AI-generated MP4 не создавался.
- Safari, физические устройства и screen reader отдельно не проверялись.

## Documentation

[Case study](docs/case-study.md) · [AI tools](docs/ai-tools.md) · [Assets sources](docs/assets-sources.md) · [Character concept](docs/character-concept.md) · [Logo animation concept](docs/logo-animation-concept.md) · [QA report](docs/qa-report.md) · [Deployment](docs/deployment.md)

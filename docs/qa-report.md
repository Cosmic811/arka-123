# QA report

Production: [https://cosmic811.github.io/arka-123/](https://cosmic811.github.io/arka-123/)

Repository: [https://github.com/Cosmic811/arka-123](https://github.com/Cosmic811/arka-123)

Проверка: **12 октября 2026**. Automated checks отделены от ручного smoke check в Chromium. Production deployment выполняется через [GitHub Actions](https://github.com/Cosmic811/arka-123/actions/workflows/pages.yml).

## Automated checks

| Check | Result |
| --- | --- |
| npm ci | PASS |
| npm run lint | PASS |
| npm run typecheck | PASS |
| npm test | PASS: 13 / 13 |
| npm run build | PASS: static export |
| GitHub Pages deployment | PASS |

CI выполняет те же проверки перед deploy. Тесты проверяют валидацию формы, наличие активных media, provenance отзывов, origin metadata и project prefix для public assets. Число тестов не изменялось при финальном cleanup.

Node.js >=22.18.0 - поддерживаемая база проекта; CI и локальная проверка используют Node.js 24. Нативный type stripping появился раньше, в 22.6.0; версия 22.18.0 выбрана как база без experimental warning, а не объявляется абсолютным техническим минимумом явного флага. [Node.js TypeScript support](https://nodejs.org/api/typescript.html).

## Responsive

Chromium viewport, не физические устройства. [Измерения](qa/public-live/responsive.json), [функциональные результаты](qa/public-live/functional.json), [console](qa/public-live/console.json), [снимки](qa/public-live/README.md).

| Width | client / scrollWidth | Host | Result |
| --- | --- | --- | --- |
| 360 | 345 / 345 | static | PASS |
| 390 | 375 / 375 | static | PASS |
| 768 | 753 / 753 | static | PASS |
| 1024 | 1009 / 1009 | sticky | PASS |
| 1280 | 1265 / 1265 | sticky | PASS |
| 1440 | 1425 / 1425 | sticky | PASS |

15 px занимает scrollbar. Horizontal overflow = 0; Hero загружен, natural size 1600 × 2000, object-position 50% 50%. Незагруженных видимых изображений в этих проверках нет. Host сохраняет композицию, текст и лицо читаемы.

## Production smoke check

- Первый экран, завершение loader, логотип, Header и anchors проверены.
- Space tabs: ArrowRight, End и Home переключают выбранный сценарий и фотографию.
- Desktop depth работает в режиме depth. Pause переводит в static и aria-pressed=true; resume возвращает управление. На mobile используется static fallback.
- Host просмотрен на desktop и mobile; runtime-код сцены и renderer не менялись при cleanup.
- Gallery/lightbox: открытие, ArrowRight, Escape и возврат фокуса проверены, включая mobile.
- Тариф «Полдня» ведёт к inquiry; тарифы и отзывы сохранены. Просмотрены footer и mobile-композиция формы.
- Пустая форма показывает две ошибки и фокусирует имя. Заполненная вымышленными данными показывает: «Демонстрационная форма. Сообщение не отправлено.» Отправка и сохранение отсутствуют.
- Mobile menu: Escape возвращает фокус кнопке меню, переход к Space закрывает dialog.
- Console: 0 warnings / errors. Hydration errors не наблюдались.
- HTTPS: страница и 25 проверенных assets возвращают HTTP 200, Open Graph URL содержит один project prefix. [HTTP audit](qa/public-live/http-assets.json). Это целевой ресурсный аудит, не полный HAR.

## Dependencies

На 12 октября: npm audit --omit=dev - **0 vulnerabilities**. Общий npm audit - **5 high**, все в dev-цепочке eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces. Это tooling для lint; цепочка не входит в браузерный static runtime. Уязвимость требует передачи глубоко вложенного glob pattern в Node.js-процесс; сайт такие шаблоны не принимает.

Для [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) исправленная версия не опубликована. Предложение npm откатить eslint-config-next до другой major не применялось; audit fix --force не запускался. [Сводка](qa/public-live/dependency-audit.json).

ESLint 9 находится в EOL. ESLint 10 не обновлён перед передачей: используемые eslint-plugin-react и eslint-plugin-jsx-a11y не объявляют совместимость с этой major. Линтер проходит; несовместимые peer dependencies принудительно не обходились. [ESLint version support](https://eslint.org/version-support/).

## Evidence and limitations

Сохранены сравнения настоящих фото и концепций: [workshop](qa/final/workshop-geometry.jpg), [lecture](qa/final/lecture-geometry.jpg), [cutout](qa/final/host-cutout-check.jpg). Исторические local evidence в qa/final и qa/production-prep не выдаются за новые проверки публичного сайта. Локальные origin удалены из исторических URL без изменения измерений.

Reduced motion проверен по коду; отдельная runtime-эмуляция preference не заявляется. Mobile fallback и ручной pause проверены в браузере. Не проверены отдельно Safari, physical iOS / Android devices, screen reader, Save-Data / low-memory / WebGL context-loss injection. Production Core Web Vitals на реальных пользователях и FPS benchmark не собирались. Исторический CLS 0 относится только к локальной dev-загрузке.

Depth - 2.5D из одного кадра. Отдельный AI-generated MP4 не создавался. Компания, цены и отзывы концептуальные; форма demo.

## Repository hygiene

В текущих текстовых файлах не обнаружены credentials, приватные контактные данные, employer Drive URL, внутренние generation IDs или абсолютные локальные пути. Markdown-ссылки проверены. Исходные архивы, модели, виртуальные окружения и cache исключены из Git; все активные production media сохранены.

Старые workshop.webp, lecture.webp и gallery-library-view.webp оставлены: их имена используются историческими QA evidence. arka-logo.png также сохранён: на него ссылаются реестр контента, media tests и QA. Удаление ради небольшого сокращения размера не выполнялось.

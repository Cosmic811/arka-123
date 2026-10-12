# Deployment

Production: [https://cosmic811.github.io/arka-123/](https://cosmic811.github.io/arka-123/)

Repository: [https://github.com/Cosmic811/arka-123](https://github.com/Cosmic811/arka-123)

Hosting: **GitHub Pages**. Сайт опубликован как статический экспорт Next.js с HTTPS.

## Workflow

[pages.yml](../.github/workflows/pages.yml): checkout → Node.js 24 → npm ci → lint → typecheck → 13 tests → static export → Pages artifact → deploy. Запуск при push в main и вручную. Проверки выполняются до публикации.

## Public build settings

~~~text
NEXT_STATIC_EXPORT=true
NEXT_PUBLIC_BASE_PATH=/arka-123
NEXT_PUBLIC_SITE_URL=https://cosmic811.github.io/arka-123/
~~~

Base path применяется к Next.js bundles и public media, включая карту глубины и cutout. Metadata использует только origin, поэтому project path не дублируется в Open Graph URL. В статическом режиме изображения уже подготовлены в WebP; серверная Image Optimization API не требуется.

Backend, database, runtime secrets, Python и ML-модели не требуются. Эти public build variables не являются секретами. Локальная разработка работает без них; production workflow задаёт их автоматически.

## Delivery

В репозитории находятся код, финальные media, лицензии и выбранные QA evidence. Полные исходные архивы работодателя, модели, виртуальные окружения, cache и локальные credentials не публикуются.

[Production QA](qa-report.md). Дополнительные расходы на размещение: 0 ₽.

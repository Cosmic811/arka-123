# Происхождение финальных материалов

В работе использованы предоставленные фотографии и логотип, а также согласованные AI-концепции. Ниже указаны происхождение материалов и выполненные изменения.

| Asset | Source | Original / edited / AI-generated | Tool | Changes |
| --- | --- | --- | --- | --- |
| hero-room.webp | `processed/5.png - provided by employer` | Edited provided photo | Sharp | Crop x=0, y=220, width=941, height=1176 из 941 × 1672; uniform resize 1600 × 2000, WebP q88; без новой архитектуры |
| room-wide.webp | `processed/6.png - provided by employer` | Edited provided photo | Sharp | Central cover 16:10, uniform resize 2000 × 1250, WebP q87 |
| room-wide-depth.png | Тот же room-wide.webp | AI-derived data | Local Depth Anything V2 Small / ONNX CPU | Relative inverse depth 1000 × 625, median 3, blur 0.65; не новая RGB-фотография |
| workshop-layout.webp | processed/6.png + ранее созданный workshop-concept.png | AI furniture + restored original background | Built-in image generation; local Pillow | Central cover без растяжения; ручная маска столов / стульев / теней; вне неё восстановлен настоящий room-wide; финальный WebP |
| lecture-layout.webp | processed/6.png + ранее созданный lecture-concept.png | AI furniture + restored original background | Built-in image generation; local Pillow | То же; исправлены маски целых ножек и трибуны. Неподвижная архитектура сохранена |
| host-main.webp | Новый вымышленный персонаж, `logo/2.png - provided by employer` как reference броши | AI-generated | Built-in image generation, Sharp | Master 1122 × 1402, technical resize 1600 × 2000. Не фото настоящего сотрудника |
| host-cutout.webp | host-main.webp | AI segmentation, preserved identity | Local IS-Net general-use / ONNX CPU, Pillow | Изменена alpha, сохранены master RGB до lossy WebP encoding. Лицо, руки, одежда и брошь не перегенерированы |
| arka-mark.png | logo/2.png | Edited original | Sharp | Trim прозрачных внешних полей, без перерисовки |
| arka-wordmark.png | `logo/3.png - provided by employer` | Edited original | Sharp | Trim прозрачных полей |
| arka-logo.png | Те же предоставленные знак и написание | Edited original | Sharp | Равномерная компоновка / resize |
| icon.png | logo/2.png | Edited original | Sharp | Технический resize / фон |
| gallery-room.webp | processed/6.png | Edited provided photo | Sharp | Crop 4:3, WebP |
| gallery-window.webp | `processed/7.png - provided by employer` | Edited provided photo | Sharp | Crop 3:4, WebP |
| gallery-city-view.webp | `processed/9.png - provided by employer` | Edited provided photo | Sharp | Crop 3:4, WebP. Подпись исправлена на «Город за окном»: библиотека в этом кадре не идентифицирована |
| gallery-detail.webp | `processed/12.png - provided by employer` | Edited provided photo | Sharp | Crop 4:3, WebP; intrinsic dimensions исправлены в реестре на 1600 × 1200 |
| opengraph-image.jpg | room-wide.webp | Edited provided photo | Sharp | Crop 1200 × 630 для превью ссылки |

Source materials were provided by the employer: logo assets, advertising materials, processed photographs and raw photographs. Raw source archives are not included in the repository.

Уже обработанные работодателем фотографии не выдаются за untouched camera originals. Со своей стороны мы не меняли в hero / room цвет, окна, вид, мебель и геометрию; выполнялись crop, uniform resize и encoding. Upscale — технический, без восстановления новых достоверных деталей.

Furniture originals слегка пересэмплировали неизменяемый фон. Поэтому он восстановлен локально из настоящего кадра, а не принят целиком. Вне масок до WebP кодирования max channel delta=0; WebP с потерями может менять пиксели и не означает побитовое равенство готовых файлов. Маски и сравнения: [workshop](qa/final/workshop-geometry.jpg), [lecture](qa/final/lecture-geometry.jpg), [отчёт pipeline](qa/final/local-media-report.json).

Брошь — сгенерированная интерпретация предоставленного знака, не пиксельно идентичная копия. Увеличение не выполнялось, чтобы не рисковать утверждённым лицом и качеством master. Финальная web-сцена использует этот же cutout; нового composite AI-room кадра и MP4 нет.

Тарифы 320 / 560 / 960 BYN и отзывы Анны К., Михаила С., Ольги М. — авторский контент концепции вымышленного бренда. Отзывы имеют provenance=concept, verified=false. Телефон / email бизнеса и наличие оборудования не придуманы. Fonts: Onest / Prata, лицензии в licenses/.

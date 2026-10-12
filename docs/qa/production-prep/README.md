# Character polish / local production QA

11 October 2026. Curated evidence captured from the production build after CSS polish. These are viewport screenshots, not unreliable full-page compositor captures.

- 360 / 390 / 768 / 1024 / 1280 / 1440: Hero and character.
- 1440: About, depth, workshop, lecture, formats, character end, gallery, rates, reviews, inquiry / footer.
- responsive.json: actual viewport / overflow / image readiness / Host composition. The depth value was sampled at Host; separate 1440 depth verification passed.
- console.json: no production warnings or errors.
- http-assets.json: production asset response audit.

Historical local production evidence. The current public site and smoke-check results are documented in [QA report](../../qa-report.md). Original comparisons remain in ../final/ and ../static-review/; raw archives and model weights are excluded from Git. Image URLs in responsive.json are relative paths; local host names were removed without changing measurements.

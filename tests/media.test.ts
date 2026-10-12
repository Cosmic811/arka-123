import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { site, publishedReviews } from "../content/site.ts";

test("all active media resolve to delivered local files", () => {
  const assets = [
    site.logo,
    site.hero.media,
    ...site.space.layouts.map((x) => x.media),
    site.host.portrait,
    ...site.gallery.items,
  ];
  const paths = [
    ...assets.map((x) => x.src),
    site.host.cutout,
    site.space.depth,
  ];
  for (const path of paths) {
    assert.ok(path && path.startsWith("/"), `missing local URL: ${path}`);
    assert.ok(
      existsSync(new URL(`../public${path}`, import.meta.url)),
      `missing delivered media: ${path}`,
    );
  }
});

test("fictional testimonials retain provenance and never claim verification", () => {
  assert.equal(site.isFictionalConcept, true);
  assert.equal(publishedReviews.length, 3);
  for (const review of publishedReviews) {
    assert.equal(review.provenance, "concept");
    assert.equal(review.verified, false);
  }
});

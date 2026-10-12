import test from "node:test";
import assert from "node:assert/strict";
import { siteOrigin } from "../lib/siteOrigin.ts";

test("Pages metadata keeps only the origin to avoid a duplicate project path", () => {
  assert.equal(
    siteOrigin({ NEXT_PUBLIC_SITE_URL: "https://cosmic811.github.io/arka-123/" }).href,
    "https://cosmic811.github.io/",
  );
});

test("public metadata uses the host origin without requiring a custom env", () => {
  assert.equal(
    siteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: "arka.example" }).origin,
    "https://arka.example",
  );
  assert.equal(
    siteOrigin({ VERCEL_URL: "arka-preview.example" }).origin,
    "https://arka-preview.example",
  );
  assert.equal(
    siteOrigin({ URL: "https://arka-netlify.example" }).origin,
    "https://arka-netlify.example",
  );
});

test("custom domain overrides hosting defaults; local development still works", () => {
  assert.equal(
    siteOrigin({
      NEXT_PUBLIC_SITE_URL: "https://custom.example",
      VERCEL_PROJECT_PRODUCTION_URL: "arka.example",
    }).origin,
    "https://custom.example",
  );
  assert.equal(siteOrigin({}).origin, "http://localhost:3000");
});

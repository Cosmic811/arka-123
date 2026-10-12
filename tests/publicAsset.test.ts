import test from "node:test";
import assert from "node:assert/strict";
import { publicAsset } from "../lib/publicAsset.ts";

test("public media use the Pages project prefix, including depth and cutout", () => {
  for (const path of [
    "/images/space/hero-room.webp",
    "/images/space/room-wide-depth.png",
    "/images/host/host-cutout.webp",
    "/brand/arka-mark.png",
  ]) {
    assert.equal(publicAsset(path, "/arka-123"), `/arka-123${path}`);
    assert.equal(publicAsset(path, "/arka-123/"), `/arka-123${path}`);
    assert.equal(publicAsset(path, ""), path);
  }
});

test("external media and anchor URLs are not rewritten", () => {
  for (const path of ["https://example.com/photo.webp", "//example.com/a", "#top"]) {
    assert.equal(publicAsset(path, "/arka-123"), path);
  }
});

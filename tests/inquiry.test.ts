import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, type InquiryValues } from "../lib/inquiry.ts";

const valid: InquiryValues = {
  name: "Тест",
  method: "email",
  contact: "test@example.com",
  date: "",
  format: "",
  guests: "",
  comment: "",
};

test("a minimal valid inquiry needs no date, guests or claimed capacity", () => {
  assert.deepEqual(validateInquiry(valid), {});
});
test("blank required fields and an unknown contact method are rejected", () => {
  const errors = validateInquiry({
    ...valid,
    name: "  ",
    contact: " ",
    method: "unknown",
  });
  assert.deepEqual(Object.keys(errors).sort(), ["contact", "method", "name"]);
});
test("contact validation follows the selected channel", () => {
  assert.ok(validateInquiry({ ...valid, contact: "broken@address" }).contact);
  assert.deepEqual(
    validateInquiry({
      ...valid,
      method: "phone",
      contact: "+375 (29) 123-45-67",
    }),
    {},
  );
  assert.ok(
    validateInquiry({ ...valid, method: "phone", contact: "call-me-1234567" })
      .contact,
  );
  assert.deepEqual(
    validateInquiry({ ...valid, method: "messenger", contact: "@example" }),
    {},
  );
});
test("guest count must be a positive integer without inventing a venue limit", () => {
  for (const guests of ["0", "-3", "1.5", "five", "9007199254740992"])
    assert.ok(validateInquiry({ ...valid, guests }).guests);
  assert.deepEqual(validateInquiry({ ...valid, guests: "80" }), {});
});
test("invalid calendar dates are rejected and leap days are checked", () => {
  assert.ok(validateInquiry({ ...valid, date: "2026-02-30" }).date);
  assert.ok(validateInquiry({ ...valid, date: "2026-02-29" }).date);
  assert.deepEqual(validateInquiry({ ...valid, date: "2028-02-29" }), {});
});
test("text length limits are applied to directly supplied values", () => {
  const errors = validateInquiry({
    ...valid,
    name: "a".repeat(101),
    contact: "a".repeat(255),
    comment: "a".repeat(2001),
  });
  assert.deepEqual(Object.keys(errors).sort(), ["comment", "contact", "name"]);
});

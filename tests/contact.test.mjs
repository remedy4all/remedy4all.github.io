// Unit tests for the contact-field rules (src/lib/contact.ts, loaded with Node's type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { contactDisplay, isPlaceholder } from "../src/lib/contact.ts";
import { CONTACT } from "../site.config.mjs";

const SOON = "Coming soon";

test("placeholder values are recognised, real values are not", () => {
  assert.ok(isPlaceholder("__PLACEHOLDER_EMAIL__"));
  assert.ok(isPlaceholder(""));
  assert.ok(isPlaceholder("   "));
  assert.ok(!isPlaceholder("info@example.org"));
});

test("a placeholder shows coming soon, never itself, and has no link", () => {
  for (const field of ["email", "phone", "address"]) {
    const d = contactDisplay(field, `__PLACEHOLDER_${field.toUpperCase()}__`, SOON);
    assert.deepEqual(d, { text: SOON, published: false });
  }
});

test("a real email becomes a mailto: link", () => {
  assert.deepEqual(contactDisplay("email", " info@example.org ", SOON), {
    text: "info@example.org",
    href: "mailto:info@example.org",
    published: true,
  });
});

test("a real phone becomes a tel: link with digits and a leading +", () => {
  assert.deepEqual(contactDisplay("phone", "+30 210 000-0000", SOON), {
    text: "+30 210 000-0000",
    href: "tel:+302100000000",
    published: true,
  });
});

test("a real address is text, not a link", () => {
  assert.deepEqual(contactDisplay("address", "Οδός 1, 10000 Αθήνα", SOON), {
    text: "Οδός 1, 10000 Αθήνα",
    published: true,
  });
});

test("the configuration names all three fields", () => {
  assert.deepEqual(Object.keys(CONTACT).sort(), ["address", "email", "phone"]);
});

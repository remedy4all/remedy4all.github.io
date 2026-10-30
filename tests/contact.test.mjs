// Unit tests for the contact-field rules (src/lib/contact.ts, loaded with Node's type stripping).
import { test } from "node:test";
import assert from "node:assert/strict";
import { contactDisplay, contactRows, isPlaceholder } from "../src/lib/contact.ts";
import { CONTACT } from "../site.config.mjs";

const UNSET = { email: "__PLACEHOLDER_EMAIL__", phone: "__PLACEHOLDER_PHONE__", address: "__PLACEHOLDER_ADDRESS__" };

test("placeholder values are recognised, real values are not", () => {
  assert.ok(isPlaceholder("__PLACEHOLDER_EMAIL__"));
  assert.ok(isPlaceholder(""));
  assert.ok(isPlaceholder("   "));
  assert.ok(isPlaceholder(undefined));
  assert.ok(!isPlaceholder("info@example.org"));
});

test("a placeholder or unset value has no display at all", () => {
  for (const field of ["email", "phone", "address"]) {
    assert.equal(contactDisplay(field, `__PLACEHOLDER_${field.toUpperCase()}__`), undefined);
    assert.equal(contactDisplay(field, ""), undefined);
    assert.equal(contactDisplay(field, undefined), undefined);
  }
});

test("unset or placeholder fields get no row", () => {
  assert.deepEqual(contactRows(UNSET), []);
  assert.deepEqual(contactRows({}), []);
  assert.deepEqual(
    contactRows({ ...UNSET, email: "info@example.org", phone: "  " }).map((r) => r.field),
    ["email"],
  );
});

test("setting a phone or address value makes its row appear, in field order", () => {
  const rows = contactRows({ email: "info@example.org", phone: "+30 210 000-0000", address: "Οδός 1, 10000 Αθήνα" });
  assert.deepEqual(rows, [
    { field: "email", text: "info@example.org", href: "mailto:info@example.org" },
    { field: "phone", text: "+30 210 000-0000", href: "tel:+302100000000" },
    { field: "address", text: "Οδός 1, 10000 Αθήνα" },
  ]);
  assert.deepEqual(contactRows({ ...UNSET, address: "Οδός 1" }).map((r) => r.field), ["address"]);
});

test("a real email becomes a mailto: link", () => {
  assert.deepEqual(contactDisplay("email", " info@example.org "), {
    field: "email",
    text: "info@example.org",
    href: "mailto:info@example.org",
  });
});

test("a real address is text, not a link", () => {
  assert.deepEqual(contactDisplay("address", "Οδός 1, 10000 Αθήνα"), { field: "address", text: "Οδός 1, 10000 Αθήνα" });
});

test("the configuration names all three fields and publishes only the email", () => {
  assert.deepEqual(Object.keys(CONTACT).sort(), ["address", "email", "phone"]);
  assert.equal(CONTACT.email, "remedy4all@csl.gr");
  assert.deepEqual(contactRows(CONTACT).map((r) => r.field), ["email"]);
});

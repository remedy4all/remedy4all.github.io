// How the contact values from site.config.mjs are shown. Kept free of imports and of TypeScript-only
// runtime syntax so the tests can load it directly under Node's type stripping.

export type ContactField = "email" | "phone" | "address";

export const CONTACT_FIELDS: ContactField[] = ["email", "phone", "address"];

export interface ContactDisplay {
  field: ContactField;
  /** The value as shown. Never a placeholder. */
  text: string;
  /** Link target, or undefined when the value is not linkable. */
  href?: string;
}

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || !value.trim() || value.trim().startsWith("__PLACEHOLDER");
}

/** The display of one value, or undefined while it is unset or a placeholder. */
export function contactDisplay(field: ContactField, value: string | undefined | null): ContactDisplay | undefined {
  if (isPlaceholder(value)) return undefined;
  const text = (value as string).trim();
  if (field === "email") return { field, text, href: `mailto:${text}` };
  if (field === "phone") return { field, text, href: `tel:${text.replace(/(?!^\+)[^\d]/g, "")}` };
  return { field, text };
}

/** The rows to render, in field order. An unset or placeholder field has no row at all. */
export function contactRows(contact: Partial<Record<ContactField, string>>): ContactDisplay[] {
  return CONTACT_FIELDS.map((field) => contactDisplay(field, contact[field])).filter(
    (row): row is ContactDisplay => row !== undefined,
  );
}

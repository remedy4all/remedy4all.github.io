// How a contact value from site.config.mjs is shown. Kept free of imports and of TypeScript-only
// runtime syntax so the tests can load it directly under Node's type stripping.

export type ContactField = "email" | "phone" | "address";

export interface ContactDisplay {
  /** Text to show. Never the placeholder itself. */
  text: string;
  /** Link target, or undefined when the value is not published or is not linkable. */
  href?: string;
  /** False while the value is still the placeholder. */
  published: boolean;
}

export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || !value.trim() || value.trim().startsWith("__PLACEHOLDER");
}

export function contactDisplay(field: ContactField, value: string, comingSoon: string): ContactDisplay {
  if (isPlaceholder(value)) return { text: comingSoon, published: false };
  const text = value.trim();
  if (field === "email") return { text, href: `mailto:${text}`, published: true };
  if (field === "phone") return { text, href: `tel:${text.replace(/(?!^\+)[^\d]/g, "")}`, published: true };
  return { text, published: true };
}

type ClassValue = string | false | null | undefined;

/** Joins conditional class names. Falsy entries are dropped. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

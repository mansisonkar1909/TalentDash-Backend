export function normalizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\b(pvt|ltd|inc|llc|private|limited|technologies|services|india|web|\.com)\b\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
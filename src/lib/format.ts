/**
 * Formatting helpers.
 *
 * Deliberately kept in their own module with **no imports**.
 *
 * These are used by components that end up inside client bundles. Pulling them
 * from `content/proof.ts` instead would drag the whole content layer — and with
 * it Zod — across the server/client boundary, which measured at roughly 90 KB
 * of gzipped JavaScript for two number formatters. Validation belongs at build
 * time on the server; formatting belongs here.
 */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number): string {
  return usd.format(amount);
}

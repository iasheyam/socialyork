/**
 * Data access seam.
 *
 * Phase 1 has no data source: the marketing site reads static copy straight from
 * `content/site.ts`. When the Phase 2 portal arrives, every read -- invoices,
 * receipts, code redemptions, content delivered, platform metrics -- lands here
 * behind typed functions, so marketing and portal UI never import a client or
 * database directly.
 *
 * Intentionally empty for now.
 */
export {};

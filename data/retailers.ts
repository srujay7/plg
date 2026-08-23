// Retailer options shown at sign-up (Report setup) and as a locked indicator in the report's
// top header. v1 only scores Amazon US (scraping is reliable there) — Walmart US, Amazon UK,
// and the top 4 EU marketplaces are shown so the roadmap is visible, but locked until
// anti-blocking infrastructure lands for them (PLG-09, PLG-14).
export const RETAILER_OPTIONS = [
  { value: "amazon-us", label: "Amazon (US)", enabled: true },
  { value: "walmart-us", label: "Walmart (US)", enabled: false },
  { value: "amazon-uk", label: "Amazon (UK)", enabled: false },
  { value: "amazon-de", label: "Amazon (Germany)", enabled: false },
  { value: "amazon-fr", label: "Amazon (France)", enabled: false },
  { value: "amazon-it", label: "Amazon (Italy)", enabled: false },
  { value: "amazon-es", label: "Amazon (Spain)", enabled: false },
] as const;

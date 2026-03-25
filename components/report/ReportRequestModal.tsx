"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const PERSONAL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "live.com",
  "msn.com",
  "me.com",
  "gmx.com",
];

const REGIONS = [
  { code: "US", label: "Amazon US", locked: false },
  { code: "UK", label: "Amazon UK", locked: true },
  { code: "CA", label: "Amazon CA", locked: true },
  { code: "FR", label: "Amazon FR", locked: true },
  { code: "DE", label: "Amazon DE", locked: true },
  { code: "ES", label: "Amazon ES", locked: true },
  { code: "IT", label: "Amazon IT", locked: true },
];

type Step = "form" | "validating-brand" | "success";

interface ReportRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReportRequestModal({ open, onClose }: ReportRequestModalProps) {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("US");
  const [regionOpen, setRegionOpen] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [errors, setErrors] = useState<{ brand?: string; email?: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRegionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setBrand("");
        setEmail("");
        setRegion("US");
        setStep("form");
        setErrors({});
        setRegionOpen(false);
      }, 300);
    }
  }, [open]);

  function validateEmail(value: string): string | undefined {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    const domain = value.split("@")[1]?.toLowerCase();
    if (PERSONAL_DOMAINS.includes(domain)) {
      return "Please use a business email address";
    }
    return undefined;
  }

  function handleSubmit() {
    const newErrors: { brand?: string; email?: string } = {};

    if (!brand.trim()) {
      newErrors.brand = "Brand name is required";
    }

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and start brand validation
    setErrors({});
    setStep("validating-brand");

    // Simulate brand validation (checking if it's a real Amazon brand)
    setTimeout(() => {
      const trimmed = brand.trim().toLowerCase();
      // Simple heuristic: reject very short, numeric-only, or gibberish-looking inputs
      const isLikelyInvalid =
        trimmed.length < 2 ||
        /^\d+$/.test(trimmed) ||
        /^[^a-z0-9]+$/i.test(trimmed) ||
        /^(.)\1+$/.test(trimmed) ||
        /^(test|asdf|qwerty|abc|xxx|aaa|bbb|zzz|foo|bar|baz)$/i.test(trimmed);

      if (isLikelyInvalid) {
        setStep("form");
        setErrors({ brand: "Please enter a valid Amazon brand name" });
      } else {
        setStep("success");
        // Navigate to report page after a short delay
        const slug = brand.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        setTimeout(() => {
          onClose();
          router.push(`/sample-report/rufus-visibility/${slug}`);
        }, 2500);
      }
    }, 2000);
  }

  const selectedRegion = REGIONS.find((r) => r.code === region)!;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-text-muted transition-colors hover:text-text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              {/* ── Form Step ── */}
              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="text-xl font-bold text-text-primary">
                    Request Your AI Visibility Report
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    We&apos;ll analyze your brand&apos;s AI visibility and send a detailed report to your email.
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Brand Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                        Brand Name on Amazon
                      </label>
                      <input
                        type="text"
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                          if (errors.brand) setErrors((prev) => ({ ...prev, brand: undefined }));
                        }}
                        placeholder="e.g. Nike, Anker, CeraVe"
                        className={cn(
                          "w-full rounded-lg border bg-slate-50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none transition-colors",
                          errors.brand
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-border focus:border-cyan/50"
                        )}
                      />
                      {errors.brand && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                        >
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.brand}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                        Business Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="you@company.com"
                        className={cn(
                          "w-full rounded-lg border bg-slate-50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted/50 outline-none transition-colors",
                          errors.email
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-border focus:border-cyan/50"
                        )}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
                        >
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Region Dropdown */}
                    <div>
                      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-text-muted">
                        Amazon Region
                      </label>
                      <div ref={dropdownRef} className="relative">
                        <button
                          type="button"
                          onClick={() => setRegionOpen(!regionOpen)}
                          className="flex w-full items-center justify-between rounded-lg border border-border bg-slate-50 px-4 py-2.5 text-sm text-text-primary transition-colors hover:border-cyan/30"
                        >
                          <span>{selectedRegion.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-text-muted transition-transform",
                              regionOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {regionOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-border bg-white shadow-xl"
                            >
                              {REGIONS.map((r) => (
                                <button
                                  key={r.code}
                                  type="button"
                                  disabled={r.locked}
                                  onClick={() => {
                                    if (!r.locked) {
                                      setRegion(r.code);
                                      setRegionOpen(false);
                                    }
                                  }}
                                  className={cn(
                                    "flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors",
                                    r.locked
                                      ? "cursor-not-allowed text-text-muted/40"
                                      : r.code === region
                                      ? "bg-cyan/10 text-cyan"
                                      : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                                  )}
                                >
                                  <span>{r.label}</span>
                                  {r.locked && (
                                    <span className="flex items-center gap-1 text-xs text-text-muted/40">
                                      <Lock className="h-3 w-3" />
                                      Coming Soon
                                    </span>
                                  )}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="mt-6 w-full rounded-lg bg-[#10B981] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Generate Report
                  </button>
                </motion.div>
              )}

              {/* ── Validating Brand Step ── */}
              {step === "validating-brand" && (
                <motion.div
                  key="validating"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <Loader2 className="h-10 w-10 animate-spin text-cyan" />
                  <h3 className="mt-4 text-lg font-bold text-text-primary">
                    Validating Brand
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    Checking &ldquo;{brand}&rdquo; on Amazon {selectedRegion.label.replace("Amazon ", "")}...
                  </p>
                </motion.div>
              )}

              {/* ── Success Step ── */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 className="h-14 w-14 text-cyan" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-bold text-text-primary">
                    Report Generated!
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-text-secondary">
                    Your AI Visibility Report for <span className="font-medium text-cyan">{brand}</span> is ready.
                    A copy will also be sent to <span className="font-medium text-text-primary">{email}</span>.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan" />
                    Loading your report...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

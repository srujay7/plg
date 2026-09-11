"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { PrimaryButton, SecondaryButton } from "@/components/plg/shared/Buttons";
import { BenefitsBanner } from "@/components/plg/SignupFlow/BenefitsBanner";
import { RETAILER_OPTIONS } from "@/data/retailers";

// Sign-up flow (PLG-01/02): 3 screens — Sign up (email + name), Verify (email OTP),
// Report setup (brand + description + ASIN) — as a client-side state machine.
// Ported from aeo-plg-signup-mock-dark_5.html's `state`/`render()` globals.

// Business-email gate (PLG-02): free-domain providers are blocked. Engineering owns the
// real blocklist; this is a representative sample for the mock.
const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
];

type EmailStatus = "unknown" | "new" | "existing" | "blocked";

// There's no backend in this first pass, so "existing account" is simulated: an email
// containing "existing" (e.g. existing@acme.com) routes through the login/OTP path instead
// of sign-up, so both PLG-02 branches are reviewable without a real accounts table.
function classifyEmail(email: string): EmailStatus {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed.includes("@")) return "unknown";
  const domain = trimmed.split("@")[1] || "";
  if (FREE_EMAIL_DOMAINS.includes(domain)) return "blocked";
  if (trimmed.includes("existing")) return "existing";
  return "new";
}

function PrecisionBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[22px] flex gap-2.5 rounded-md border-[1.5px] border-[rgba(90,175,254,.30)] bg-[rgba(90,175,254,.08)] p-3.5">
      <div className="mt-px flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-[var(--plg-accent)] text-[12px] font-extrabold text-white">
        i
      </div>
      <div className="text-[13px] leading-relaxed text-[var(--plg-text2)] [&_b]:text-[var(--plg-ink)]">
        {children}
      </div>
    </div>
  );
}

export function SignupFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("unknown");
  const [resent, setResent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [brand, setBrand] = useState("");
  const [retailer, setRetailer] = useState<(typeof RETAILER_OPTIONS)[number]["value"]>(
    RETAILER_OPTIONS[0].value
  );
  const [description, setDescription] = useState("");
  const [asin, setAsin] = useState("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  const isBlocked = emailStatus === "blocked";
  const isExisting = emailStatus === "existing";

  function handleEmailBlur() {
    if (!email) return;
    setEmailStatus(classifyEmail(email));
  }

  function handleContinueFromScreen1() {
    const status = classifyEmail(email);
    setEmailStatus(status);
    if (status === "blocked" || status === "existing") return;
    setStep(2);
  }

  function handleOtpChange(idx: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < 5) otpRefs.current[idx + 1]?.focus();
  }

  function handleContinueToReportSetup() {
    const params = new URLSearchParams({ brand: brand.trim() || "Your brand" });
    router.push(`/plg/report?${params.toString()}`);
  }

  const otpFilled = useMemo(() => otp.every((d) => d.length === 1), [otp]);

  return (
    <div className="flex min-h-[max(520px,calc(100vh-160px))] w-full flex-col md:flex-row">
      <div className="flex flex-1 items-start justify-start px-6 py-8 md:px-16 md:py-12">
        <div className="w-full max-w-[440px]">
          {step === 1 && (
            <div>
              <h1 className="mb-2 text-2xl font-bold leading-tight text-[var(--plg-ink)]">
                See your brand&rsquo;s AI-shelf visibility
              </h1>
              <p className="mb-7 text-sm leading-relaxed text-[var(--plg-text2)]">
                Sign up with your work email to get a free AI Visibility report for Alexa AI —
                no card, no anonymous preview.
              </p>

              {isExisting && (
                <div className="mb-5 flex gap-2.5 rounded-md border border-[rgba(90,175,254,.30)] bg-[rgba(90,175,254,.10)] p-3.5">
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[var(--plg-indigo)]" />
                  <div>
                    <div className="mb-0.5 text-[13px] font-bold text-[var(--plg-ink)]">
                      Looks like you already have an account
                    </div>
                    <div className="text-[13px] leading-relaxed text-[var(--plg-text2)]">
                      We&rsquo;ve sent a sign-in link to <b className="text-[var(--plg-ink)]">{email}</b>. Click it
                      to go straight to your report.
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-4.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-[var(--plg-ink)]">
                  Work email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly={isExisting}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailStatus !== "unknown") setEmailStatus("unknown");
                  }}
                  onBlur={handleEmailBlur}
                  placeholder="jane@acme.com"
                  className={cn(
                    "w-full rounded-[6px] border-[1.5px] bg-[var(--plg-surface)] px-3.5 py-2.5 text-sm text-[var(--plg-body)] outline-none transition focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]",
                    isBlocked ? "border-[var(--plg-error)] bg-[rgba(255,90,80,.10)]" : "border-[var(--plg-hair)]"
                  )}
                />
                {isBlocked && (
                  <div className="mt-1.5 text-xs font-medium text-[var(--plg-error)]">
                    Use your work email — personal domains (gmail, outlook, yahoo, etc.) aren&rsquo;t
                    supported.
                  </div>
                )}
              </div>

              {isExisting ? (
                <SecondaryButton
                  className="w-full"
                  onClick={() => setResent(true)}
                  disabled={resent}
                >
                  {resent ? "Link sent ✓" : "Resend sign-in link"}
                </SecondaryButton>
              ) : (
                <PrimaryButton
                  className="w-full"
                  disabled={!email}
                  onClick={handleContinueFromScreen1}
                >
                  Continue
                </PrimaryButton>
              )}

              <div className="mt-4.5 text-center text-xs leading-relaxed text-[var(--plg-muted)]">
                No password needed — we&rsquo;ll email you a one-time code to sign in from now on. By
                continuing you agree to CommerceIQ&rsquo;s Terms and Privacy Policy.
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button
                className="mb-5 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--plg-text2)] hover:text-[var(--plg-indigo)]"
                onClick={() => setStep(1)}
              >
                &larr; Back
              </button>
              <h1 className="mb-2 text-2xl font-bold leading-tight text-[var(--plg-ink)]">
                Check your email
              </h1>
              <p className="mb-7 text-sm leading-relaxed text-[var(--plg-text2)]">
                We sent a 6-digit code to <b className="text-[var(--plg-ink)]">{email || "your email"}</b>.
                Enter it below — no password required.
              </p>
              <div className="mb-4.5 flex gap-2.5">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="h-[54px] w-[46px] rounded-[6px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] text-center text-xl font-bold text-[var(--plg-ink)] outline-none focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]"
                  />
                ))}
              </div>
              <div className="mb-6 flex items-center justify-between text-xs text-[var(--plg-muted)]">
                <span>Code expires in 04:12</span>
                <span className="cursor-pointer font-semibold text-[var(--plg-indigo)]">Resend code</span>
              </div>
              <PrimaryButton className="w-full" disabled={!otpFilled} onClick={() => setStep(3)}>
                Verify &amp; continue
              </PrimaryButton>
            </div>
          )}

          {step === 3 && (
            <div>
              <button
                className="mb-5 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--plg-text2)] hover:text-[var(--plg-indigo)]"
                onClick={() => setStep(2)}
              >
                &larr; Back
              </button>
              <h1 className="mb-2 text-2xl font-bold leading-tight text-[var(--plg-ink)]">
                Tell us about your brand
              </h1>
              <p className="mb-7 text-sm leading-relaxed text-[var(--plg-text2)]">
                This powers your one free AI Visibility report.
              </p>
              <PrecisionBanner>
                The more specific you are, the better your results.
              </PrecisionBanner>
              <div className="mb-4.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-[var(--plg-ink)]">
                  Retailer
                </label>
                <select
                  value={retailer}
                  onChange={(e) =>
                    setRetailer(e.target.value as (typeof RETAILER_OPTIONS)[number]["value"])
                  }
                  className="w-full rounded-[6px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-sm text-[var(--plg-body)] outline-none focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]"
                >
                  {RETAILER_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value} disabled={!r.enabled}>
                      {r.label}
                      {!r.enabled ? " — coming soon" : ""}
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 text-xs leading-relaxed text-[var(--plg-muted)]">
                  Basic launches on Amazon (US) — the rest are on the roadmap.
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-[var(--plg-ink)]">
                  Brand name on retailer
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Purina"
                  className="w-full rounded-[6px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-sm text-[var(--plg-body)] outline-none focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-[var(--plg-ink)]">
                  Product URL
                </label>
                <input
                  type="text"
                  value={asin}
                  onChange={(e) => setAsin(e.target.value)}
                  placeholder="https://www.amazon.com/dp/B0XXXXXXX"
                  className="w-full rounded-[6px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-sm text-[var(--plg-body)] outline-none focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]"
                />
                <div className="mt-1.5 text-xs leading-relaxed text-[var(--plg-muted)]">
                  A SKU that belongs to your brand on Amazon — we&rsquo;ll provide AEO-ready
                  content for that ASIN.
                </div>
              </div>
              <div className="mb-4.5">
                <label className="mb-1.5 block text-[13px] font-semibold text-[var(--plg-ink)]">
                  Tell us about your brand on retailer and what categories you sell{" "}
                  <span className="font-normal text-[var(--plg-muted)]">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. We sell premium dry and wet dog food, including grain-free and senior formulas, across 40+ SKUs."
                  className="min-h-[76px] w-full resize-y rounded-[6px] border-[1.5px] border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--plg-body)] outline-none focus:border-[var(--plg-secondary)] focus:shadow-[0_0_0_3px_rgba(90,175,254,0.25)]"
                />
              </div>
              <PrimaryButton
                className="w-full"
                disabled={!brand || !asin}
                onClick={handleContinueToReportSetup}
              >
                Continue to Report
              </PrimaryButton>
              <div className="mt-4.5 text-center text-xs leading-relaxed text-[var(--plg-muted)]">
                Next, you&rsquo;ll confirm your topics and shopper prompts inside Content Agent —
                then we generate your report.
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="flex-1">
        <BenefitsBanner />
      </div>
    </div>
  );
}

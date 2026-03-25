"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PulseTarget, HeroTimelineState, ImageVariant } from "@/data/heroEvents";
import { purchaseMoments } from "@/data/heroEvents";
import { EventTimelineBar } from "./EventTimelineBar";

interface PDPViewportProps {
  state: HeroTimelineState;
  compact?: boolean;
}

/* ─── Image config: map variant → src + CSS filter ─── */
const IMAGE_CONFIG: Record<ImageVariant, { src: string; filter?: string }> = {
  baseline: { src: "/images/unoptimized-hero.png" },
  fitness: { src: "/images/optimized-hero.png", filter: "saturate(1.2) brightness(1.05)" },
  outdoor: { src: "/images/lifestyle-vega.png", filter: "saturate(1.15) brightness(1.1)" },
  study: { src: "/images/optimized-hero.png", filter: "saturate(0.9) brightness(1.05) hue-rotate(10deg)" },
  wellness: { src: "/images/lifestyle-vega.png", filter: "saturate(0.9) sepia(0.15) brightness(1.05)" },
  sports: { src: "/images/lifestyle-vega.png", filter: "saturate(1.3) contrast(1.1)" },
};

/* ─── Pulse positions (% of PDP content area) ─── */
const PULSE_POS: Record<string, { top: string; left: string }> = {
  image: { top: "30%", left: "20%" },
  title: { top: "8%", left: "72%" },
  bullets: { top: "42%", left: "72%" },
};


/* ─── Star Rating ─── */
function StarRating() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-px">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} width="13" height="13" viewBox="0 0 12 12">
            <path
              d="M6 1l1.5 3.1L11 4.5 8.5 7l.6 3.5L6 8.8 2.9 10.5l.6-3.5L1 4.5l3.5-.4L6 1z"
              fill={star <= 4 ? "#f5a623" : "rgba(200,200,200,0.4)"}
              stroke="none"
            />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-blue-600">(1,247 reviews)</span>
    </div>
  );
}

/* ─── AI Pulse (larger orb with trailing glow) ─── */
function AIPulse({ target }: { target: PulseTarget }) {
  if (!target) return null;
  const pos = PULSE_POS[target];
  if (!pos) return null;

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      animate={{ top: pos.top, left: pos.left }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Pulsing halo */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Trailing glow (delayed position) */}
      <motion.div
        className="absolute -inset-3 rounded-full bg-cyan-400/10"
        animate={{ top: pos.top, left: pos.left }}
        transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
      />
      {/* Main orb */}
      <div
        className="w-4 h-4 rounded-full bg-cyan-400"
        style={{
          boxShadow:
            "0 0 14px 6px rgba(16,185,129,0.6), 0 0 32px 12px rgba(16,185,129,0.2)",
        }}
      />
    </motion.div>
  );
}

/* ─── Promo Badge ─── */
function PromoBadge({ text }: { text: string }) {
  return (
    <motion.div
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.div>
  );
}

/* ─── Main PDP Viewport ─── */
export function PDPViewport({ state, compact = false }: PDPViewportProps) {
  const {
    productImage,
    title,
    bullets,
    currentMoment,
    eventTag,
    promoBadge,
    overlay,
    pulseTarget,
  } = state;

  const imgConfig = IMAGE_CONFIG[productImage];

  /* ── Mobile compact version ── */
  if (compact) {
    return (
      <div className="w-full rounded-xl border border-slate-200 bg-white backdrop-blur-sm overflow-hidden">
        <div className="p-3 flex gap-3">
          <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden relative bg-slate-100">
            <Image
              src={imgConfig.src}
              alt="Nourra product"
              fill
              className="object-cover"
              style={imgConfig.filter ? { filter: imgConfig.filter } : undefined}
            />
          </div>
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.p
                key={title}
                className="text-[11px] font-medium text-text-primary leading-tight mb-1 whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {title}
              </motion.p>
            </AnimatePresence>
            <span className="text-[10px] text-green-400 font-medium">
              $3.49
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop full PDP ── */
  const pdpViewportHeight = 490;

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-2xl shadow-black/10 relative bg-white"
      style={{ height: pdpViewportHeight }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 border-b border-slate-200 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-white border border-slate-200">
          <span className="text-[10px] text-slate-400 font-mono">
            retailer.com/nourra-superfood-shake
          </span>
        </div>
      </div>

      {/* Event Timeline Bar */}
      <EventTimelineBar
        currentMoment={currentMoment}
        eventTag={eventTag}
        moments={purchaseMoments}
      />

      {/* PDP content area */}
      <div className="relative overflow-hidden" style={{ height: pdpViewportHeight - 38 - 78 }}>
        {/* AI Pulse */}
        <AIPulse target={pulseTarget} />

        {/* Overlay */}
        <AnimatePresence>
          {overlay && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-base text-white/90 font-medium text-center px-8"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                {overlay}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDP content */}
        <div className="p-5">
          {/* Top section: Image + Details */}
          <div className="flex gap-5">
            {/* Product Image */}
            <div className="w-[42%] flex-shrink-0">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={productImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: 1,
                      scale: productImage !== "baseline" ? 1.05 : 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Image
                      src={imgConfig.src}
                      alt="Nourra Superfood Shake"
                      fill
                      className="object-contain"
                      style={imgConfig.filter ? { filter: imgConfig.filter } : undefined}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0 pt-1">
              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={title}
                  className="text-[15px] font-semibold text-slate-900 leading-snug mb-2 whitespace-pre-line rounded px-1 -mx-1"
                  initial={{ opacity: 0, backgroundColor: "rgba(251, 191, 36, 0.12)" }}
                  animate={{ opacity: 1, backgroundColor: "rgba(251, 191, 36, 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {title}
                </motion.h3>
              </AnimatePresence>

              {/* Rating */}
              <div className="mb-2">
                <StarRating />
              </div>

              {/* Price + Promo Badge */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-bold text-slate-900">$3.49</span>
                <span className="text-[11px] text-slate-400">
                  ($0.29 / Fl Oz)
                </span>
                <AnimatePresence>
                  {promoBadge && <PromoBadge text={promoBadge} />}
                </AnimatePresence>
              </div>

              {/* Bullets */}
              <AnimatePresence mode="wait">
                <motion.ul
                  key={bullets.join("|")}
                  className="space-y-1.5 mb-4 rounded px-1 -mx-1"
                  initial={{ opacity: 0, backgroundColor: "rgba(251, 191, 36, 0.08)" }}
                  animate={{ opacity: 1, backgroundColor: "rgba(251, 191, 36, 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-slate-600 leading-relaxed flex gap-1.5"
                    >
                      <span className="text-slate-400 flex-shrink-0 mt-0.5">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>

              {/* Add to Cart */}
              <div className="w-full py-2.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 text-center text-[12px] text-slate-900 font-semibold shadow-sm">
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

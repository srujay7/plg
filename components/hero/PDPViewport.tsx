"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { easing } from "@/lib/motion";
import { basePDP } from "@/data/heroEvents";
import type { HeroEvent } from "@/data/heroEvents";
import type { HeroPhase } from "@/hooks/useHeroEventCycle";

interface PDPViewportProps {
  activeEvent: HeroEvent;
  phase: HeroPhase;
  compact?: boolean;
}

type PDPFocus = HeroEvent["pdpFocus"];

const CAMERA_POSITIONS: Record<PDPFocus, { x: number; y: number; scale: number }> = {
  title: { x: 0, y: 0, scale: 1.5 },
  bullets: { x: 0, y: -80, scale: 1.4 },
  description: { x: 0, y: -160, scale: 1.3 },
  image: { x: 0, y: -40, scale: 1.6 },
  keywords: { x: 0, y: -200, scale: 1.4 },
  richContent: { x: 0, y: -260, scale: 1.3 },
};

function ContentBlock({
  label,
  content,
  isActive,
  phase,
  afterContent,
  badgeText,
}: {
  label: string;
  content: string | string[];
  isActive: boolean;
  phase: HeroPhase;
  afterContent?: string;
  badgeText?: string;
}) {
  const showTransformed = isActive && (phase === "transforming" || phase === "holding");
  const displayContent = showTransformed && afterContent ? afterContent :
    Array.isArray(content) ? content[0] : content;

  return (
    <div
      className={cn(
        "relative rounded-lg border px-3 py-2 transition-all duration-300",
        isActive
          ? "border-cyan/40 bg-cyan/5"
          : "border-border/30 bg-navy/20"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[9px] uppercase tracking-wider text-text-muted font-medium">
          {label}
        </span>
        {isActive && badgeText && showTransformed && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[8px] bg-cyan/20 text-cyan px-1.5 py-0.5 rounded-full border border-cyan/30"
          >
            {badgeText}
          </motion.span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={showTransformed ? "after" : "before"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.6, ease: easing.inOutCubic }}
        >
          {Array.isArray(content) && !showTransformed ? (
            <ul className="space-y-0.5">
              {content.map((item, i) => (
                <li key={i} className="text-[10px] text-text-secondary leading-tight">
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <p
              className={cn(
                "text-[11px] leading-tight",
                isActive && showTransformed
                  ? "text-text-primary"
                  : "text-text-secondary"
              )}
            >
              {displayContent}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Cyan glow during transformation */}
      {isActive && phase === "transforming" && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-cyan/50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.8 }}
        />
      )}
    </div>
  );
}

export function PDPViewport({ activeEvent, phase, compact = false }: PDPViewportProps) {
  const focus = activeEvent.pdpFocus;
  const cam = CAMERA_POSITIONS[focus];

  if (compact) {
    // Mobile: only show the active element
    const label =
      focus === "title" ? "Title" :
      focus === "bullets" ? "Bullets" :
      focus === "description" ? "Description" :
      focus === "image" ? "Hero Image" :
      focus === "keywords" ? "Keywords" :
      "A+ Content";

    const content =
      focus === "bullets" ? basePDP.bullets :
      focus === "title" ? basePDP.title :
      focus === "description" ? basePDP.description :
      focus === "image" ? "Product hero image" :
      focus === "keywords" ? basePDP.keywords.join(", ") :
      basePDP.richContent;

    return (
      <div className="w-full rounded-xl border border-border/40 bg-navy/60 p-3 backdrop-blur-sm">
        <ContentBlock
          label={label}
          content={content}
          isActive={true}
          phase={phase}
          afterContent={activeEvent.pdpContent.after}
          badgeText={activeEvent.pdpContent.badgeText}
        />
      </div>
    );
  }

  // Desktop: full PDP with camera zoom
  return (
    <div className="w-full max-w-[520px] mx-auto rounded-xl border border-border/30 bg-navy/60 overflow-hidden backdrop-blur-sm"
      style={{ height: 300 }}
    >
      <motion.div
        className="p-4 space-y-3 origin-top"
        initial={false}
        animate={{
          x: cam.x,
          y: cam.y,
          scale: cam.scale,
        }}
        transition={{ duration: 0.5, ease: easing.inOutCubic }}
      >
        {/* Title */}
        <ContentBlock
          label="Title"
          content={basePDP.title}
          isActive={focus === "title"}
          phase={phase}
          afterContent={focus === "title" ? activeEvent.pdpContent.after : undefined}
          badgeText={focus === "title" ? activeEvent.pdpContent.badgeText : undefined}
        />

        {/* Image placeholder */}
        <ContentBlock
          label="Hero Image"
          content="Product hero image — lifestyle photography"
          isActive={focus === "image"}
          phase={phase}
          afterContent={focus === "image" ? activeEvent.pdpContent.after : undefined}
          badgeText={focus === "image" ? activeEvent.pdpContent.badgeText : undefined}
        />

        {/* Bullets */}
        <ContentBlock
          label="Bullets"
          content={basePDP.bullets}
          isActive={focus === "bullets"}
          phase={phase}
          afterContent={focus === "bullets" ? activeEvent.pdpContent.after : undefined}
          badgeText={focus === "bullets" ? activeEvent.pdpContent.badgeText : undefined}
        />

        {/* Description */}
        <ContentBlock
          label="Description"
          content={basePDP.description}
          isActive={focus === "description"}
          phase={phase}
          afterContent={focus === "description" ? activeEvent.pdpContent.after : undefined}
          badgeText={focus === "description" ? activeEvent.pdpContent.badgeText : undefined}
        />

        {/* Keywords */}
        <ContentBlock
          label="Backend Keywords"
          content={basePDP.keywords.join(", ")}
          isActive={focus === "keywords"}
          phase={phase}
          afterContent={focus === "keywords" ? activeEvent.pdpContent.after : undefined}
          badgeText={focus === "keywords" ? activeEvent.pdpContent.badgeText : undefined}
        />

        {/* Rich Content / A+ */}
        <ContentBlock
          label="A+ Content"
          content={basePDP.richContent}
          isActive={focus === "richContent"}
          phase={phase}
          afterContent={focus === "richContent" ? activeEvent.pdpContent.after : undefined}
          badgeText={focus === "richContent" ? activeEvent.pdpContent.badgeText : undefined}
        />
      </motion.div>
    </div>
  );
}

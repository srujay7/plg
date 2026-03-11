"use client";

import { motion } from "framer-motion";
import { easing } from "@/lib/motion";
import {
  Heart,
  Zap,
  Rocket,
  Tv,
  Tag,
  Sparkles,
} from "lucide-react";
import type { HeroEvent } from "@/data/heroEvents";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Heart,
  Zap,
  Rocket,
  Tv,
  Tag,
  Sparkles,
};

interface MomentDialProps {
  events: HeroEvent[];
  activeIndex: number;
}

// Arc layout: semicircle from 180° (left) to 0° (right) across the top
const ARC_CX = 280;
const ARC_CY = 90;
const ARC_R = 220;
const SVG_W = 560;
const SVG_H = 110;

function getNodePosition(index: number, total: number) {
  // Distribute evenly from 180° to 0° (left to right)
  const angle = Math.PI - (index / (total - 1)) * Math.PI;
  return {
    x: ARC_CX + ARC_R * Math.cos(angle),
    y: ARC_CY - ARC_R * Math.sin(angle),
    angle,
  };
}

function getHandAngleDeg(index: number, total: number) {
  // Convert node angle to CSS rotation degrees (0° = up, clockwise)
  const angle = Math.PI - (index / (total - 1)) * Math.PI;
  // SVG angle: 0 is right, PI is left. We want rotation from center upward.
  const deg = 90 - (angle * 180) / Math.PI;
  return deg;
}

export function MomentDial({ events, activeIndex }: MomentDialProps) {
  const positions = events.map((_, i) => getNodePosition(i, events.length));
  const handAngle = getHandAngleDeg(activeIndex, events.length);

  // Build arc path for the semicircle track
  const arcStart = getNodePosition(0, events.length);
  const arcEnd = getNodePosition(events.length - 1, events.length);
  const arcPath = `M ${arcStart.x} ${arcStart.y} A ${ARC_R} ${ARC_R} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

  return (
    <div className="w-full flex justify-center">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full max-w-[560px] h-auto overflow-visible"
      >
        {/* Arc track */}
        <path
          d={arcPath}
          fill="none"
          stroke="rgba(100, 120, 160, 0.2)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Clock hand */}
        <motion.line
          x1={ARC_CX}
          y1={ARC_CY}
          x2={positions[activeIndex].x}
          y2={positions[activeIndex].y}
          stroke="rgba(0, 212, 255, 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            x2: positions[activeIndex].x,
            y2: positions[activeIndex].y,
          }}
          transition={{ duration: 0.4, ease: easing.outExpo }}
        />

        {/* Center dot */}
        <circle cx={ARC_CX} cy={ARC_CY} r="4" fill="rgba(0, 212, 255, 0.8)" />

        {/* Event nodes */}
        {events.map((event, i) => {
          const pos = positions[i];
          const isActive = i === activeIndex;
          const IconComp = ICON_MAP[event.icon];

          return (
            <g key={event.id}>
              {/* Glow ring for active */}
              {isActive && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  fill="none"
                  stroke="rgba(0, 212, 255, 0.3)"
                  strokeWidth="2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}

              {/* Node circle */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r="14"
                initial={false}
                animate={{
                  fill: isActive
                    ? "rgba(0, 212, 255, 0.2)"
                    : "rgba(15, 23, 42, 0.8)",
                  stroke: isActive
                    ? "rgba(0, 212, 255, 0.8)"
                    : "rgba(100, 120, 160, 0.3)",
                  scale: isActive ? 1.1 : 1,
                }}
                strokeWidth={isActive ? 2 : 1}
                transition={{ duration: 0.3, ease: easing.outCubic }}
              />

              {/* Icon (rendered as foreignObject for Lucide) */}
              <foreignObject
                x={pos.x - 8}
                y={pos.y - 8}
                width="16"
                height="16"
                style={{ overflow: "visible" }}
              >
                <div className="flex items-center justify-center w-4 h-4">
                  {IconComp && (
                    <IconComp
                      size={12}
                      className={
                        isActive ? "text-cyan" : "text-text-muted opacity-50"
                      }
                    />
                  )}
                </div>
              </foreignObject>

              {/* Label below arc */}
              <motion.text
                x={pos.x}
                y={pos.y + 26}
                textAnchor="middle"
                className="text-[9px] fill-current uppercase tracking-wider"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  fill: isActive ? "rgb(0, 212, 255)" : "rgb(148, 163, 184)",
                }}
                transition={{ duration: 0.3 }}
              >
                {event.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

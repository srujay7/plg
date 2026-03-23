"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PurchaseMoment } from "@/data/heroEvents";

interface EventTimelineBarProps {
  currentMoment: string | null;
  eventTag: string | null;
  moments: PurchaseMoment[];
}

export function EventTimelineBar({
  currentMoment,
  eventTag,
  moments,
}: EventTimelineBarProps) {
  const activeIndex = moments.findIndex((m) => m.label === currentMoment);
  const progressPercent =
    activeIndex >= 0 ? ((activeIndex + 1) / moments.length) * 100 : 0;

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/80 relative overflow-hidden">
      {/* Flash overlay on moment change */}
      <AnimatePresence>
        {currentMoment && (
          <motion.div
            key={currentMoment}
            className="absolute inset-0 bg-amber-400/10 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Progress track */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-200">
        <motion.div
          className="h-full bg-gray-700"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>

      {/* Moment dots */}
      <div className="flex items-center justify-between gap-1 mb-1">
        {moments.map((m) => {
          const isActive = m.label === currentMoment;
          return (
            <div key={m.label} className="flex flex-col items-center flex-1 min-w-0">
              <div className="relative">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    isActive
                      ? "bg-gray-800 scale-150"
                      : "bg-gray-300"
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow:
                            "0 0 6px 2px rgba(0,0,0,0.15)",
                        }
                      : undefined
                  }
                />
              </div>
              <span
                className={`text-[10px] mt-1 truncate max-w-full text-center leading-tight transition-colors duration-400 ${
                  isActive ? "text-gray-800 font-bold" : "text-gray-400"
                }`}
              >
                {m.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Event tag text */}
      <div className="h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {eventTag && (
            <motion.span
              key={eventTag}
              className="text-[13px] text-gray-700 font-semibold"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {eventTag}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

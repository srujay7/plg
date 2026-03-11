"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { easing } from "@/lib/motion";
import type { ContextModule } from "@/data/heroContent";
import {
  Database,
  Store,
  Search,
  Bot,
  Shield,
  TrendingUp,
  Check,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Database,
  Store,
  Search,
  Bot,
  Shield,
  TrendingUp,
};

interface ContextModuleCardProps {
  module: ContextModule;
  isActive: boolean;
  className?: string;
}

export function ContextModuleCard({
  module,
  isActive,
  className,
}: ContextModuleCardProps) {
  const Icon = ICON_MAP[module.icon] || Database;
  const items = module.items || [];
  const rows = module.rows || [];
  const hasItems = items.length > 0;
  const hasRows = rows.length > 0;

  return (
    <motion.div
      className={cn(
        "rounded-xl border p-3 w-[200px]",
        "bg-navy/80 backdrop-blur-sm",
        "transition-all duration-500",
        isActive
          ? "border-cyan/40 opacity-100"
          : "border-border opacity-40",
        className
      )}
      animate={{
        scale: isActive ? 1 : 0.98,
      }}
      transition={{ duration: 0.4, ease: easing.outCubic }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className={cn(
            "w-3.5 h-3.5 transition-colors duration-500",
            isActive ? "text-cyan" : "text-text-muted"
          )}
        />
        <span
          className={cn(
            "text-xs font-semibold transition-colors duration-500",
            isActive ? "text-text-primary" : "text-text-muted"
          )}
        >
          {module.title}
        </span>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan"
          />
        )}
      </div>

      {/* Items (key-value pairs) */}
      {hasItems && (
        <div className="space-y-1">
          {items.slice(0, 5).map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between gap-2"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0.4,
                x: isActive ? 0 : -4,
              }}
              transition={{
                duration: 0.3,
                delay: isActive ? i * 0.06 : 0,
                ease: easing.outCubic,
              }}
            >
              <span className="text-[10px] text-text-muted truncate">
                {item.label}
              </span>
              {item.value && (
                <span className="text-[10px] text-text-secondary font-mono truncate max-w-[80px]">
                  {item.value}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Rows (status rows) */}
      {hasRows && (
        <div className="space-y-1">
          {rows.slice(0, 5).map((row, i) => (
            <motion.div
              key={row.label}
              className="flex items-center gap-1.5"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0.4,
                x: isActive ? 0 : -4,
              }}
              transition={{
                duration: 0.3,
                delay: isActive ? i * 0.06 : 0,
                ease: easing.outCubic,
              }}
            >
              {row.status === "pass" && (
                <Check className="w-2.5 h-2.5 text-green shrink-0" />
              )}
              {row.status === "warning" && (
                <AlertTriangle className="w-2.5 h-2.5 text-orange shrink-0" />
              )}
              {row.status === "fail" && (
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
              )}
              <span className="text-[10px] text-text-muted truncate flex-1">
                {row.label}
              </span>
              {row.value && (
                <span className="text-[10px] text-text-secondary font-mono truncate max-w-[70px]">
                  {row.value}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

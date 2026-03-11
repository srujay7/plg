"use client";

import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface ComparisonRow {
  dimension: string;
  traditional: string;
  modern: string;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  traditionalLabel?: string;
  modernLabel?: string;
  className?: string;
}

export function ComparisonTable({
  rows,
  traditionalLabel = "Traditional",
  modernLabel = "Modern",
  className,
}: ComparisonTableProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn("w-full overflow-x-auto", className)}
    >
      <motion.table variants={fadeInUp} className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border-bright">
            <th className="py-4 px-4 text-left text-sm font-medium text-text-muted w-1/3">
              &nbsp;
            </th>
            <th className="py-4 px-4 text-left text-sm font-medium text-text-muted w-1/3">
              {traditionalLabel}
            </th>
            <th className="py-4 px-4 text-left text-sm font-medium text-cyan w-1/3">
              {modernLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.dimension}
              className={cn(
                "border-b border-border transition-colors",
                i % 2 === 0 ? "bg-midnight-light" : "bg-midnight"
              )}
            >
              <td className="py-4 px-4 text-sm font-medium text-text-primary">
                {row.dimension}
              </td>
              <td className="py-4 px-4 text-sm text-text-muted">
                {row.traditional}
              </td>
              <td className="py-4 px-4 text-sm text-text-primary border-l border-cyan/20">
                {row.modern}
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
}

"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ReportRequestModal } from "./ReportRequestModal";

const ReportModalContext = createContext<{ open: () => void }>({ open: () => {} });

export function useReportModal() {
  return useContext(ReportModalContext);
}

export function ReportModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReportModalContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <ReportRequestModal open={isOpen} onClose={() => setIsOpen(false)} />
    </ReportModalContext.Provider>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { easing, timing } from "@/lib/motion";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Product", href: "/#how-it-works" },
  { label: "AI Agency", href: "/ai-agency" },
  { label: "Customers", href: "/#case-study" },
  { label: "Pricing", href: "/#pricing" },
];

const drawerVariants = {
  closed: {
    x: "100%",
    transition: { duration: timing.fast, ease: easing.outCubic },
  },
  open: {
    x: 0,
    transition: { duration: timing.fast, ease: easing.outExpo },
  },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeDrawer = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-[#1a2340] bg-[#0a0e1a]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-white">
            Content <span className="text-[#00d4ff]">Agent</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#book-demo"
          className="hidden rounded-lg bg-[#00d4ff] px-5 py-2 text-sm font-semibold text-[#0a0e1a] transition-opacity hover:opacity-90 md:inline-block"
        >
          Book Demo
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: timing.fast }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={closeDrawer}
              aria-hidden
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-[#1a2340] bg-[#0a0e1a] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold tracking-tight text-white">
                  Content <span className="text-[#00d4ff]">Agent</span>
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-md p-2 text-slate-300 hover:text-white"
                  onClick={closeDrawer}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={closeDrawer}
                      className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 transition-colors hover:bg-[#111730] hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <a
                  href="#book-demo"
                  onClick={closeDrawer}
                  className="block w-full rounded-lg bg-[#00d4ff] px-5 py-3 text-center text-sm font-semibold text-[#0a0e1a] transition-opacity hover:opacity-90"
                >
                  Book Demo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

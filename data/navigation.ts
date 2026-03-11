export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Product", href: "#how-it-works" },
  { label: "AI Agency", href: "/ai-agency" },
  { label: "Customers", href: "#case-study" },
  { label: "Pricing", href: "#pricing" },
];

export const ctaLink: NavLink = {
  label: "Book Demo",
  href: "#book-demo",
};

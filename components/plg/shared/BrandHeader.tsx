// Brand-only header: the same CommerceIQ mark used in the report product's Topbar,
// without the Home/Topics/Prompts nav or report actions — for surfaces (like sign-up)
// that come before there's a report to navigate.
export function BrandHeader() {
  return (
    <div className="sticky top-0 z-30 border-b border-[rgba(255,255,255,.12)] bg-[#7A1FB8]">
      <div className="flex min-h-16 items-center px-6 py-2 md:px-16">
        <div className="flex items-center gap-2.5 font-bold tracking-tight text-white">
          <span
            className="h-2.5 w-2.5 rounded-[3px] shadow-[0_0_12px_rgba(255,255,255,.6)]"
            style={{ background: "#ffffff" }}
          />
          CommerceIQ
        </div>
      </div>
    </div>
  );
}

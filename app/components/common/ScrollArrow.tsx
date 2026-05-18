import { useLocale } from "next-intl";

interface ScrollArrowProps {
  direction: "left" | "right";
  visible: boolean;
  onClick: () => void;
}

export default function ScrollArrow({
  direction,
  visible,
  onClick,
}: ScrollArrowProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  // In RTL the visual chevron should point the opposite way
  const visualDirection = isRTL
    ? direction === "left"
      ? "right"
      : "left"
    : direction;

  // Hide by sliding toward the edge it sits on
  const hideTranslate =
    direction === "left" ? "-translate-x-2" : "translate-x-2";

  return (
    <button
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#04120c]/90 text-white shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:text-emerald-400 ${visible ? "pointer-events-auto translate-x-0 opacity-100" : `pointer-events-none opacity-0 ${hideTranslate}`}`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d={visualDirection === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        />
      </svg>
    </button>
  );
}

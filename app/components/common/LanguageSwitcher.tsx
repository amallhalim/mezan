"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

/**
 * A client component that toggles the application language between Arabic and English.
 * Automatically updates the URL locale segment using next-intl routing.
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";

    /**
     * 🌟 PROFESSIONAL WAY:
     * We use the 'router.replace' from our navigation tools.
     * It automatically handles the URL segments for us!
     */
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold backdrop-blur-xl transition-all hover:bg-white/10"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}

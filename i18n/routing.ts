import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * 🧠 THE LOCALIZATION BRAIN
 * This is the single source of truth for all language rules.
 */
export const routing = defineRouting({
  // 1. Supported languages
  locales: ["en", "ar"],

  // 2. Default language
  defaultLocale: "en",

  // 3. Always show the language in the URL (e.g. /en/calculator)
  localePrefix: "always",

  /*
   * 💡 NOTE ON PATHNAMES:
   * We are NOT using the 'pathnames' object here because we want to keep
   * URLs consistent in English for all languages (e.g. /ar/calculator).
   * This makes sharing links easier and keeps the folder structure simple.
   */
});

// Create the smart tools using our new routing brain
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

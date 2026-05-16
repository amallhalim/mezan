import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * 📦 ADVANCED MESSAGE LOADER
 * Now includes TimeZone support!
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    // 🕒 Set the default TimeZone for the whole app
    timeZone: "Asia/Riyadh",
    // 🔢 You can also set a default currency if needed
    now: new Date(),
  };
});

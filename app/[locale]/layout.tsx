import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import { ThemeProvider } from "../context/ThemeContext";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import "../globals.css";
import { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Test from "./Test";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 🖋️ PROFESSIONAL ARABIC TYPOGRAPHY
 * Tajawal is a premium Google Font designed for high readability in Arabic.
 */
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

/**
 * 🔍 DYNAMIC SEO (Search Engine Optimization)
 * Automatically translates the page title and description for Google/Social Media.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

// 🌟 PROFESSIONAL: Enable static rendering for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  // 1. Security Check
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // 2. 🚀 ADVANCED: Enable all next-intl features for this locale
  setRequestLocale(locale);

  // 3. 📦 Load messages professionally
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

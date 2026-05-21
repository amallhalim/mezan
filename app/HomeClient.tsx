"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Cpu, Clock, Calendar } from "lucide-react";
import { useTheme } from "./context/ThemeContext";
import Counter from "./Counter";
import ShowData from "./ShowData";
import { useTranslations, useFormatter, useLocale } from "next-intl";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import { Link } from "../i18n/navigation";

export default function HomeClient() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("HomePage");
  const format = useFormatter();
  const [now, setNow] = useState(new Date());

  // 🕒 LIVE CLOCK: Update time every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreetingKey = () => {
    const hours = now.getHours();
    if (hours < 12) return "greetingMorning";
    if (hours < 18) return "greetingAfternoon";
    return "greetingEvening";
  };

  return (
    <div
      className={`selection:bg-primary/30 min-h-screen font-sans transition-colors duration-500 ${
        theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
      }`}
    >
      <div className="fixed top-4 left-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Background Atmospheric Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-primary/20 absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 py-12 lg:py-24">
        {/* --- Header Section --- */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-primary-foreground text-primary-foreground inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              {t("systemOperational")}
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition-all hover:bg-white/10"
            >
              {t("mode")}: {theme}
            </button>
          </div>
          <h1 className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-5xl font-bold tracking-tight text-transparent lg:text-7xl">
            {t(getGreetingKey())}
          </h1>
        </header>

        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <Counter />
          <ShowData />
        </div>

        <div className="grid items-start gap-8 md:grid-cols-2">
          {/* --- Interactive Controls Card --- */}
          <section className="space-y-8 rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/10">
            <div className="mb-2 flex items-center gap-4">
              <div className="bg-primary/10 border-primary/20 flex size-12 items-center justify-center rounded-2xl border">
                <ShieldCheck className="text-primary size-6" />
              </div>
              <h2 className="text-xl font-black tracking-tight">
                {t("identitySearch")}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="ml-1 text-[10px] font-black tracking-[0.15em] text-gray-500 uppercase"
                >
                  {t("username")}
                </label>
                <input
                  id="username"
                  type="text"
                  defaultValue="JohnDoe"
                  className="focus:border-primary/40 w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm font-medium transition-all outline-none focus:bg-white/[0.08]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="food-search"
                  className="ml-1 text-[10px] font-black tracking-[0.15em] text-gray-500 uppercase"
                >
                  {t("macroSearch")}
                </label>
                <input
                  id="food-search"
                  type="text"
                  placeholder="e.g. Chicken Breast"
                  className="focus:border-primary/40 w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm font-medium transition-all outline-none focus:bg-white/[0.08]"
                />
              </div>
            </div>

            <button className="group bg-primary text-secondary hover:bg-primary-hover flex w-full items-center justify-center gap-2 rounded-2xl py-5 font-black tracking-widest uppercase shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98]">
              {t("submitPlate")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </section>

          <div className="space-y-8">
            <section className="group flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 backdrop-blur-xl">
              <p className="mb-6 text-[10px] font-black tracking-widest text-gray-600 uppercase">
                {t("assetVerification")}
              </p>
              <div className="rounded-3xl border border-white/5 bg-white/5 p-10 transition-colors group-hover:bg-white/10">
                <Image
                  src="/next.svg"
                  alt="Mizan Logo"
                  width={140}
                  height={40}
                  className="opacity-80 transition-opacity group-hover:opacity-100 dark:invert"
                  style={{ height: "auto" }}
                />
              </div>
            </section>

            <section className="flex items-center justify-between rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div
                title="System Status: Operational"
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <div className="absolute inset-0 size-3 animate-ping rounded-full bg-emerald-500 opacity-40" />
                  <div className="relative size-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-tighter text-emerald-500 uppercase">
                    {t("nodeStatus")}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    {t("liveSyncing")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="mb-1 text-[9px] font-black tracking-widest text-gray-600 uppercase">
                  {t("architecture")}
                </span>
                <span
                  data-testid="version-tag"
                  className="rounded-lg bg-white/5 px-2 py-1 font-mono text-xs text-gray-400"
                >
                  v1.0.4-stable
                </span>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 rounded-[2rem] border border-white/5 bg-white/[0.03] p-5 backdrop-blur-xl transition-all hover:bg-white/5">
                <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
                  <Clock className="text-primary size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase">
                    {t("currentTime")}
                  </span>
                  <span className="text-sm font-black text-white tabular-nums">
                    {format.dateTime(now, {
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: true,
                      timeZoneName: "short",
                      numberingSystem: isArabic ? "arab" : "latn",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-[2rem] border border-white/5 bg-white/[0.03] p-5 backdrop-blur-xl transition-all hover:bg-white/5">
                <div className="bg-primary/10 border-primary/20 flex size-10 items-center justify-center rounded-xl border">
                  <Calendar className="text-primary size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase">
                    {t("currentDate")}
                  </span>
                  <span className="text-sm font-black text-white">
                    {format.dateTime(now, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      numberingSystem: isArabic ? "arab" : "latn",
                    })}
                  </span>
                </div>
              </div>
            </section>

            <Link
              href="/calculator"
              className="bg-primary/5 border-primary/20 hover:bg-primary/10 group block rounded-[2.5rem] border p-8 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-black">
                    {t("openCalculator")}
                  </h3>
                  <p className="text-sm text-gray-500">{t("returnEngine")}</p>
                </div>
                <div className="bg-primary text-secondary flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                  <Cpu className="size-6" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

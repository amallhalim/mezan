import { useState } from "react";
import { useTheme } from "./context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className={`min-h-screen font-sans selection:bg-primary/30 transition-colors duration-500 ${
      theme === "dark" ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"
    }`}>
      {/* Background Atmospheric Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-12 lg:py-24">
        {/* --- Header Section --- */}
        <header className="mb-16 space-y-4">
          <div className="flex justify-between items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-foreground text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              System Operational
            </div>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              Mode: {theme}
            </button>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
            Testing Sandbox
          </h1>
        </header>


        <div className="p-8 rounded-3xl border-2 border-primary/20 bg-white/5 backdrop-blur-md mb-12">
          {/* State & Interaction */}
          <h2 className="text-2xl font-bold mb-4">Counter Interaction</h2>
          <p className="text-lg mb-6">Current count is: <span className="font-mono text-primary">{count}</span></p>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90"
              name="increment"
              onClick={increment}
            >
              Increment
            </button>
            <button
              className="px-6 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20"
              name="decrement"
              onClick={decrement}
            >
              Decrement
            </button>
          </div>
        </div>


        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* --- Interactive Controls Card --- */}
          <section className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-8 hover:border-white/10 transition-all duration-500 shadow-2xl">
            <div className="flex items-center gap-4 mb-2">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <ShieldCheck className="size-6 text-primary" />
              </div>
              <h2 className="text-xl font-black tracking-tight">Identity & Search</h2>
            </div>

            <div className="space-y-6">
              {/* getByLabelText Hook */}
              <div className="space-y-2">
                <label htmlFor="username" className="text-[10px] font-black uppercase text-gray-500 tracking-[0.15em] ml-1">Username</label>
                <input
                  id="username"
                  type="text"
                  defaultValue="JohnDoe"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all"
                />
              </div>

              {/* getByPlaceholderText Hook */}
              <div className="space-y-2">
                <label htmlFor="food-search" className="text-[10px] font-black uppercase text-gray-500 tracking-[0.15em] ml-1">Macro Search</label>
                <input
                  id="food-search"
                  type="text"
                  placeholder="e.g. Chicken Breast"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-primary/40 focus:bg-white/[0.08] transition-all"
                />
              </div>
            </div>

            {/* getByRole (Button) Hook */}
            <button className="group w-full bg-primary text-secondary font-black py-5 rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              Submit Plate
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </section>

          <div className="space-y-8">
            {/* --- Visual Assets Card --- */}
            <section className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center justify-center group">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Asset Verification</p>
              {/* getByAltText Hook */}
              <div className="p-10 rounded-3xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
                <Image
                  src="/next.svg"
                  alt="Mizan Logo"
                  width={140}
                  height={40}
                  className="dark:invert opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </section>

            {/* --- System Status Card --- */}
            <section className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 flex items-center justify-between">
              {/* getByTitle Hook */}
              <div title="System Status: Operational" className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-3 bg-emerald-500 rounded-full animate-ping absolute inset-0 opacity-40" />
                  <div className="size-3 bg-emerald-500 rounded-full relative" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-500">Node Status</span>
                  <span className="text-xs font-bold text-gray-400">Live & Syncing</span>
                </div>
              </div>

              {/* getByTestId Hook */}
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Architecture</span>
                <span data-testid="version-tag" className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-lg">
                  v1.0.4-stable
                </span>
              </div>
            </section>

            {/* Navigation Link (getByRole link) */}
            <a href="/calculator" className="block p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] hover:bg-primary/10 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-lg mb-1">Open Calculator</h3>
                  <p className="text-sm text-gray-500">Return to the macro engine</p>
                </div>
                <div className="size-12 rounded-2xl bg-primary text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu className="size-6" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

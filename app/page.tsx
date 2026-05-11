import Image from "next/image";
import { ArrowRight, Activity, ShieldCheck, Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-primary/30">
      {/* Background Atmospheric Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] size-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] size-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative container mx-auto px-6 py-20 max-w-4xl">
        {/* --- Hero Section --- */}
        <header className="flex flex-col items-center text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Activity className="size-3" />
            Performance Tracking
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Testing Sandbox
          </h1>
          {/* <p className="text-lg text-gray-400 max-w-xl leading-relaxed font-medium">
            Master the art of high-precision health tracking. Use this high-end environment to learn how different Testing Library queries work.
          </p> */}
        </header>

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

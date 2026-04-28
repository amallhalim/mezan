"use client";
import React, { useMemo } from 'react';

interface TotalMacrosFooterProps {
  totals: { calories: number; protein: number; carbs: number; fat: number };
  onClick?: () => void;
}

const GOALS = { calories: 2500, protein: 150, carbs: 300, fat: 80 };

const MACROS = [
  { key: 'protein' as const, label: 'Protein', short: 'PRO', color: 'var(--success)', glow: 'var(--primary-glow)', track: 'oklch(from var(--success) l c h / 0.1)' },
  { key: 'carbs' as const, label: 'Carbs', short: 'CRB', color: 'var(--warning)', glow: 'oklch(from var(--warning) l c h / 0.4)', track: 'oklch(from var(--warning) l c h / 0.1)' },
  { key: 'fat' as const, label: 'Fat', short: 'FAT', color: 'var(--error)', glow: 'oklch(from var(--error) l c h / 0.4)', track: 'oklch(from var(--error) l c h / 0.1)' },
];

function ArcRing({ percent, color, glow, size = 48, stroke = 3.5 }: {
  percent: number; color: string; glow: string; size?: number; stroke?: number;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(percent, 100) / 100) * circ;
  const cx = size / 2, cy = size / 2;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${glow})`, transition: 'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)' }}
      />
    </svg>
  );
}

export default function TotalMacrosFooter({ totals, onClick }: TotalMacrosFooterProps) {
  const calPct = Math.min((totals.calories / GOALS.calories) * 100, 100);
  const isOver = totals.calories > GOALS.calories;
  const isNear = calPct >= 80 && !isOver;

  const calColor = isOver ? 'var(--error)' : 'var(--primary)';
  const calGlow = isOver ? 'var(--error)' : 'var(--primary-glow)';

  // Donut arc for calories — big ring
  const R = 22, CIRC = 2 * Math.PI * R;
  const calDash = (calPct / 100) * CIRC;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-3"
      style={{ background: 'linear-gradient(to top, var(--background) 60%, transparent)' }}
    >
      <div className="container mx-auto max-w-2xl">
        <div
          onClick={onClick}
          className="relative overflow-hidden rounded-3xl cursor-pointer
            active:scale-[0.98] transition-transform duration-150 select-none"
          style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-elevated) 100%)',
            border: '1px solid var(--border)',
            boxShadow: `0 0 0 1px var(--border), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px oklch(from ${calGlow} l c h / 0.1)`,
          }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-6 right-6 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${calColor}60, transparent)` }}
          />

          {/* Calorie progress bar — ultra thin, full width */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04] overflow-hidden rounded-t-3xl">
            <div
              className="h-full transition-all duration-1000 ease-out"
              style={{
                width: `${calPct}%`,
                background: isOver
                  ? 'linear-gradient(90deg, var(--error), var(--warning))'
                  : 'linear-gradient(90deg, var(--primary), var(--primary-glow))',
                boxShadow: `0 0 12px ${calColor}`,
              }}
            />
          </div>

          <div className="flex items-center gap-4 px-5 py-4">

            {/* ── Big calorie donut ── */}
            <div className="relative shrink-0 flex items-center justify-center" style={{ width: 64, height: 64 }}>
              {/* Pulse ring when near goal */}
              {isNear && (
                <span className="absolute inset-0 rounded-full border animate-ping opacity-10"
                  style={{ borderColor: calColor }} />
              )}
              <svg width="64" height="64" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
                <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
                <circle cx="32" cy="32" r={R} fill="none"
                  stroke={calColor} strokeWidth="4"
                  strokeDasharray={`${calDash} ${CIRC}`}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 6px ${calGlow})`,
                    transition: 'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)'
                  }}
                />
              </svg>
              {/* Inner icon */}
              <div className="relative flex flex-col items-center justify-center"
                style={{ color: calColor }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L4.09 12.79a1 1 0 0 0 .79 1.61H11l-1 7.6 8.92-10.8A1 1 0 0 0 18 9.4H13l1-7.4z" />
                </svg>
              </div>
            </div>

            {/* ── Calorie numbers ── */}
            <div className="flex flex-col shrink-0">
              <span className="text-[9px] font-black tracking-[0.22em] uppercase mb-0.5"
                style={{ color: isOver ? 'var(--color-rose-500)' : 'rgba(255,255,255,0.3)' }}>
                {isOver ? '⚠ Over goal' : 'Calories'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-[2rem] font-black leading-none tabular-nums tracking-tighter"
                  style={{ color: calColor, textShadow: `0 0 20px ${calGlow}` }}>
                  {totals.calories}
                </span>
                <span className="text-[10px] font-bold text-white/20">
                  /{GOALS.calories}
                </span>
              </div>
              <span className="text-[9px] font-black tracking-widest uppercase mt-0.5"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                kcal remaining: {Math.max(GOALS.calories - totals.calories, 0)}
              </span>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch mx-1"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)' }}
            />

            {/* ── Macro rings ── */}
            <div className="flex-1 flex items-center justify-around gap-1">
              {MACROS.map(m => {
                const val = totals[m.key];
                const goal = GOALS[m.key];
                const pct = Math.min((val / goal) * 100, 100);

                return (
                  <div key={m.key} className="flex flex-col items-center gap-1.5">
                    {/* Arc ring + value overlay */}
                    <div className="relative flex items-center justify-center">
                      <ArcRing percent={pct} color={m.color} glow={m.glow} size={48} stroke={3.5} />
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-[11px] font-black leading-none tabular-nums"
                          style={{ color: m.color }}>
                          {Math.round(val)}
                        </span>
                        <span className="text-[7px] font-black opacity-40" style={{ color: m.color }}>g</span>
                      </div>
                    </div>
                    {/* Label */}
                    <span className="text-[8px] font-black tracking-[0.18em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {m.short}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ── CTA button ── */}
            <div className="shrink-0 flex items-center justify-center size-11 rounded-2xl transition-all duration-200 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${calColor}22, ${calColor}11)`,
                border: `1px solid ${calColor}30`,
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke={calColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
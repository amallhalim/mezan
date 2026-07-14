"use client";
import React from "react";
import Button from "@/app/components/common/Button";
import Badge from "@/app/components/common/Badge";
import WeightInput from "@/app/components/common/WeightInput";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function ComponentsPage() {
  const t = useTranslations("HomePage");

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      {/* Decorative Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12 lg:py-24">
        <header className="mb-16 space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Home className="size-4" />
              {t("backHome", { fallback: "Back to Home" })}
            </Link>
          </div>
          <h1 className="bg-linear-to-br from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent lg:text-6xl">
            Component Library
          </h1>
          <p className="text-lg text-zinc-400">
            Interactive Storybook-style documentation for reusable UI
            primitives.
          </p>
        </header>

        <div className="space-y-16">
          {/* BUTTON COMPONENT */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-black">Button Component</h2>
              <p className="text-sm text-zinc-400">
                Primary action elements with variants for hierarchy and states.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/2 p-8 backdrop-blur-xl">
              <h3 className="mb-4 text-xs font-black tracking-widest text-zinc-500 uppercase">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="category">Category</Button>
                <Button variant="category" isSelected>
                  Selected
                </Button>
              </div>

              <hr className="my-8 border-white/10" />

              <h3 className="mb-4 text-xs font-black tracking-widest text-zinc-500 uppercase">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
                <Button variant="primary" size="xl">
                  Extra Large
                </Button>
              </div>

              <hr className="my-8 border-white/10" />

              <h3 className="mb-4 text-xs font-black tracking-widest text-zinc-500 uppercase">
                States & Icons
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" isLoading>
                  Loading
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<ArrowLeft className="size-4" />}
                >
                  Left Icon
                </Button>
                <Button
                  variant="primary"
                  rightIcon={<ArrowLeft className="size-4 rotate-180" />}
                >
                  Right Icon
                </Button>
              </div>
            </div>
          </section>

          {/* BADGE COMPONENT */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-black">Badge Component</h2>
              <p className="text-sm text-zinc-400">
                Compact metadata display with semantic colors.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/2 p-8 backdrop-blur-xl">
              <h3 className="mb-4 text-xs font-black tracking-widest text-zinc-500 uppercase">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>

              <hr className="my-8 border-white/10" />

              <h3 className="mb-4 text-xs font-black tracking-widest text-zinc-500 uppercase">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="primary" size="sm">
                  Small Badge
                </Badge>
                <Badge variant="primary" size="md">
                  Medium Badge
                </Badge>
              </div>
            </div>
          </section>

          {/* WEIGHT INPUT COMPONENT */}
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-black">WeightInput Component</h2>
              <p className="text-sm text-zinc-400">
                Numeric input specialized for weights and measurements.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/2 p-8 backdrop-blur-xl">
              <div className="max-w-xs">
                {/* We use a mocked onChange for the static playground */}
                <WeightInput amount={150} onChange={() => {}} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

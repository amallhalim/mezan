import React from "react";
import { Search } from "lucide-react";
import { Food } from "@/app/lib/data";
import FoodCard from "./FoodCard";

interface FoodListSectionProps {
  filteredFoods: Food[];
  searchQuery: string;
  activeFood: Food | null;
  setActiveFood: (food: Food | null) => void;
}

export default function FoodListSection({
  filteredFoods,
  searchQuery,
  activeFood,
  setActiveFood,
}: FoodListSectionProps) {
  return (
    <section>
      {filteredFoods.length > 0 ? (
        <>
          {/* Section label */}
          <div className="mb-4 flex items-center gap-3 px-1">
            <p className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase">
              {searchQuery ? `Results · ${filteredFoods.length}` : "Foods"}
            </p>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="space-y-2">
            {filteredFoods.map((food, i) => (
              <div
                key={food.id}
                style={{ animationDelay: `${i * 30}ms` }}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <FoodCard
                  food={food}
                  onSelect={(f: Food) => setActiveFood(f)}
                  isSelected={activeFood?.id === food.id}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <div className="relative mb-6">
            <div className="flex size-20 items-center justify-center rounded-3xl border border-white/[0.06] bg-white/[0.03]">
              <Search className="size-8 text-gray-700" />
            </div>
            <div className="bg-primary/5 absolute inset-0 -z-10 rounded-3xl blur-2xl" />
          </div>
          <h3 className="mb-1 text-lg font-black text-white">No results</h3>
          <p className="mb-6 max-w-[220px] text-sm leading-relaxed text-gray-500">
            Can&apos;t find{" "}
            <span className="text-primary font-bold">
              &quot;{searchQuery}&quot;
            </span>{" "}
            — request it to be added.
          </p>
          <button className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 hover:border-primary/40 flex items-center gap-2 rounded-xl border px-6 py-3 text-xs font-black tracking-widest uppercase transition-all">
            <span>+</span> Request Food
          </button>
        </div>
      )}
    </section>
  );
}

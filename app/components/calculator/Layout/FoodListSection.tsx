import React from 'react';
import { Search } from 'lucide-react';
import { Food } from '@/app/lib/data';
import FoodCard from '@/app/(pages)/calculator/FoodCard';

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
  setActiveFood
}: FoodListSectionProps) {
  return (
    <section>
      {filteredFoods.length > 0 ? (
        <>
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4 px-1">
            <p className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase">
              {searchQuery ? `Results · ${filteredFoods.length}` : 'Foods'}
            </p>
            <div className="flex-1 h-px bg-white/5" />
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
        <div className="flex flex-col items-center text-center py-16 px-6">
          <div className="relative mb-6">
            <div className="size-20 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <Search className="size-8 text-gray-700" />
            </div>
            <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-2xl -z-10" />
          </div>
          <h3 className="text-lg font-black text-white mb-1">No results</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-[220px] leading-relaxed">
            Can't find{' '}
            <span className="text-primary font-bold">"{searchQuery}"</span>
            {' '}— request it to be added.
          </p>
          <button className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary
            font-black text-xs py-3 px-6 rounded-xl transition-all border border-primary/20
            hover:border-primary/40 tracking-widest uppercase">
            <span>+</span> Request Food
          </button>
        </div>
      )}
    </section>
  );
}

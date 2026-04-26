"use client";
import React, { useState, useMemo } from 'react';
import { category, Food } from '@/app/lib/data';
// Components
import CalculatorHeader from '@/app/components/calculator/Layout/CalculatorHeader';
import FoodListSection from '@/app/components/calculator/Layout/FoodListSection';
import TotalMacrosFooter from '@/app/components/calculator/Layout/TotalMacrosFooter';
import AddedFoodsSummary from '@/app/components/calculator/Layout/AddedFoodsSummary';
import QuickAdjustPanel from '@/app/components/calculator/Layout/QuickAdjustPanel';
import ResultModal from '@/app/components/calculator/Layout/ResultModal';

// Hooks
import { useMealSummary } from '@/app/hooks/useMealSummary';

export default function CalculatorPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedFoodList, setSelectedFoodList] = useState<any[]>([]);
  const [activeFood, setActiveFood] = useState<Food | null>(null);
  const [resultItem, setResultItem] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMealSummary, setShowMealSummary] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const filteredFoods = useMemo(() => {
    if (searchQuery.trim()) {
      const allFoods = category.flatMap(cat => cat.foods);
      return allFoods.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.nameAr.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return category.find(c => c.id === selectedCategory)?.foods ?? [];
  }, [selectedCategory, searchQuery]);

  const { totals } = useMealSummary(selectedFoodList);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddFood = (calculated: any) => {
    if (editingIndex !== null) {
      setSelectedFoodList(prev => { const l = [...prev]; l[editingIndex] = calculated; return l; });
      setEditingIndex(null);
      showToast(`Updated ${calculated.name}`);
    } else {
      setSelectedFoodList(prev => [...prev, calculated]);
      showToast(`Added ${calculated.name} to plate`);
    }
    setActiveFood(null);
  };

  const handlePreviewFood = (calculated: any) => {
    setResultItem(calculated);
    if (editingIndex !== null) {
      setSelectedFoodList(prev => { const l = [...prev]; l[editingIndex] = calculated; return l; });
      setEditingIndex(null);
    } else {
      setSelectedFoodList(prev => [...prev, calculated]);
    }
    setActiveFood(null);
  };

  const handleEditItem = (item: any, index: number) => {
    setEditingIndex(index);
    const baseFood = category.flatMap(c => c.foods).find(f => f.id === item.id);
    if (baseFood) setActiveFood(baseFood);
  };

  return (
    <div className='min-h-screen text-white selection:bg-primary selection:text-secondary'
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.08) 0%, #080a0c 60%)' }}
    >
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className='relative container mx-auto px-4 max-w-2xl pb-44 pt-6'>

        {/* ── Header ── */}
        <CalculatorHeader
          selectedFoodListLength={selectedFoodList.length}
          setShowMealSummary={setShowMealSummary}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* ── Food list ── */}
        <FoodListSection
          filteredFoods={filteredFoods}
          searchQuery={searchQuery}
          activeFood={activeFood}
          setActiveFood={setActiveFood}
        />


        {/* Added foods summary */}
        {selectedFoodList.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4 px-1">
              <p className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase">My Plate</p>
              <div className="flex-1 h-px bg-white/5" />
              <button
                onClick={() => setSelectedFoodList([])}
                className="text-[10px] font-black tracking-widest text-gray-600 hover:text-red-400 uppercase transition-colors"
              >
                Clear all
              </button>
            </div>
            <AddedFoodsSummary
              items={selectedFoodList}
              onRemove={(i) => {
                setSelectedFoodList(prev => prev.filter((_, idx) => idx !== i));
                if (editingIndex === i) setEditingIndex(null);
              }}
              onEdit={handleEditItem}
              onClearAll={() => setSelectedFoodList([])}
            />
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <TotalMacrosFooter totals={totals} onClick={() => setShowMealSummary(true)} />

      {/* Panels & Modals */}
      {activeFood && (
        <QuickAdjustPanel
          food={activeFood}
          onClose={() => { setActiveFood(null); setEditingIndex(null); }}
          onAdd={handleAddFood}
          onPreview={handlePreviewFood}
          isEditing={editingIndex !== null}
          initialValues={editingIndex !== null ? {
            amount: selectedFoodList[editingIndex].selectedAmount,
            isRaw: selectedFoodList[editingIndex].isRaw,
            quantity: selectedFoodList[editingIndex].quantity,
            selectedSizeId: 'custom'
          } : undefined}
        />
      )}

      {resultItem && <ResultModal item={resultItem} onClose={() => setResultItem(null)} />}

      {showMealSummary && (
        <ResultModal
          item={{
            ...totals,
            name: "My Full Plate",
            nameAr: "وجبتي بالكامل",
            icon: "🍽️",
            selectedAmount: selectedFoodList.length,
            unit: "items"
          }}
          onClose={() => setShowMealSummary(false)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-primary text-secondary font-black px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center gap-2 border border-primary/20">
            <span className="text-xl">✅</span> {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
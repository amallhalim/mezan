"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { category, Food } from '@/app/lib/data';

// Components
import CalculatorHeader from '@/app/components/calculator/Layout/CalculatorHeader';
import FoodListSection from '@/app/components/calculator/Layout/FoodListSection';
import TotalMacrosFooter from '@/app/components/calculator/Layout/TotalMacrosFooter';
import AddedFoodsSummary from '@/app/components/calculator/Layout/AddedFoodsSummary';
import QuickAdjustPanel from '@/app/components/calculator/Layout/QuickAdjustPanel';
import ResultModal from '@/app/components/calculator/Layout/ResultModal';

// Hooks & Store
import { useMealSummary } from '@/app/hooks/useMealSummary';
import { usePlatesStore } from '@/app/store/usePlatesStore';

export default function CalculatorPage() {
  // --- Global Store ---
  const plates = usePlatesStore((state) => state.plates);
  console.log("plates", plates)
  const addPlate = usePlatesStore((state) => state.addPlate);
  const updatePlate = usePlatesStore((state) => state.updatePlate);
  const clearPlates = usePlatesStore((state) => state.clearPlates);
  const removePlate = usePlatesStore((state) => state.removePlate);

  // --- Local UI State ---
  const [selectedCategory, setSelectedCategory] = useState(1);
  // const [selectedFoodList, setSelectedFoodList] = useState<any[]>([]);
  const [activeFood, setActiveFood] = useState<Food | null>(null);
  const [resultItem, setResultItem] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMealSummary, setShowMealSummary] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);


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

  const { totals } = useMealSummary(plates);

  // --- Handlers ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddFood = (calculated: any) => {
    if (!calculated) return;

    if (editingIndex !== null) {

      updatePlate(editingIndex, calculated);
      setEditingIndex(null);
      showToast(`Updated ${calculated.name}`);
    } else {
      // Add new
      // setSelectedFoodList(prev => [...prev, calculated]);
      addPlate(calculated);
      showToast(`Added ${calculated.name} to plate`);
    }
    setActiveFood(null);
  };

  const handlePreviewFood = (calculated: any) => {
    if (!calculated) return;
    setResultItem(calculated);

    // Preview often implies adding to the session in this UI flow
    if (editingIndex !== null) {

      updatePlate(editingIndex, calculated);
      setEditingIndex(null);
    } else {
      addPlate(calculated);
    }
    setActiveFood(null);
  };

  const handleEditItem = (item: any, index: number) => {
    setEditingIndex(index);
    const baseFood = category.flatMap(c => c.foods).find(f => f.id === item.id);
    if (baseFood) setActiveFood(baseFood);
  };

  const handleClearAll = () => {
    clearPlates();
  };

  const handleRemoveItem = (index: number) => {
    const itemToRemove = plates[index];
    if (itemToRemove?.id) {
      removePlate(itemToRemove.id);
    }
    if (editingIndex === index) setEditingIndex(null);
  };



  return (
    <div className='min-h-screen text-white selection:bg-primary selection:text-secondary'
    // style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, var(--primary-glow) 0%, var(--background) 60%)', opacity: 0.15 }}
    >
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className='relative container mx-auto px-4 max-w-2xl pb-44 pt-6'>
        <CalculatorHeader
          selectedFoodListLength={plates.length}
          setShowMealSummary={setShowMealSummary}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FoodListSection
          filteredFoods={filteredFoods}
          searchQuery={searchQuery}
          activeFood={activeFood}
          setActiveFood={setActiveFood}
        />

        {plates.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4 px-1">
              <p className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase">My Plate</p>
              <div className="flex-1 h-px bg-white/5" />
              <button
                onClick={handleClearAll}
                className="text-[10px] font-black tracking-widest text-gray-600 hover:text-red-400 uppercase transition-colors"
              >
                Clear all
              </button>
            </div>
            <AddedFoodsSummary
              items={plates}
              onRemove={handleRemoveItem}
              onEdit={handleEditItem}
              onClearAll={handleClearAll}
            />
          </div>
        )}
      </div>

      <TotalMacrosFooter totals={totals} onClick={() => setShowMealSummary(true)} />

      {activeFood && (
        <QuickAdjustPanel
          food={activeFood}
          onClose={() => { setActiveFood(null); setEditingIndex(null); }}
          onAdd={handleAddFood}
          onPreview={handlePreviewFood}
          isEditing={editingIndex !== null}
          initialValues={editingIndex !== null ? {
            amount: plates[editingIndex]?.selectedAmount,
            isRaw: plates[editingIndex]?.isRaw,
            quantity: plates[editingIndex]?.quantity,
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
            selectedAmount: plates.length,
            unit: "items"
          }}
          onClose={() => setShowMealSummary(false)}
        />
      )}

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
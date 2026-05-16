"use client";
import React, { useState, useMemo } from "react";
import { category, Food } from "@/app/lib/data";

// Components
import CalculatorHeader from "@/app/components/calculator/Layout/CalculatorHeader";
import FoodListSection from "@/app/components/calculator/Layout/FoodListSection";
import TotalMacrosFooter from "@/app/components/calculator/Layout/TotalMacrosFooter";
import AddedFoodsSummary from "@/app/components/calculator/Layout/AddedFoodsSummary";
import QuickAdjustPanel from "@/app/components/calculator/Layout/QuickAdjustPanel";
import ResultModal from "@/app/components/calculator/Layout/ResultModal";

// Hooks & Store
import { useMealSummary } from "@/app/hooks/useMealSummary";
import { usePlatesStore, Plate } from "@/app/store/usePlatesStore";

export default function CalculatorPage() {
  // --- Global Store ---
  const plates = usePlatesStore((state) => state.plates);
  const addPlate = usePlatesStore((state) => state.addPlate);
  const updatePlate = usePlatesStore((state) => state.updatePlate);
  const clearPlates = usePlatesStore((state) => state.clearPlates);
  const removePlate = usePlatesStore((state) => state.removePlate);

  // --- Local UI State ---
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [activeFood, setActiveFood] = useState<Food | null>(null);
  const [resultItem, setResultItem] = useState<Plate | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMealSummary, setShowMealSummary] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredFoods = useMemo(() => {
    if (searchQuery.trim()) {
      const allFoods = category.flatMap((cat) => cat.foods);
      return allFoods.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.nameAr.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return category.find((c) => c.id === selectedCategory)?.foods ?? [];
  }, [selectedCategory, searchQuery]);

  const { totals } = useMealSummary(plates);

  // --- Handlers ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddFood = (calculated: Plate) => {
    if (!calculated) return;

    if (editingIndex !== null) {
      updatePlate(editingIndex, calculated);
      setEditingIndex(null);
      showToast(`Updated ${calculated.name}`);
    } else {
      addPlate(calculated);
      showToast(`Added ${calculated.name} to plate`);
    }
    setActiveFood(null);
  };

  const handlePreviewFood = (calculated: Plate) => {
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

  const handleEditItem = (item: Plate, index: number) => {
    setEditingIndex(index);
    const baseFood = category
      .flatMap((c) => c.foods)
      .find((f) => f.id === item.id);
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
    <div
      className="selection:bg-primary selection:text-secondary min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, var(--primary-glow) 0%, var(--background) 20%)",
        opacity: 1,
      }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="relative container mx-auto max-w-2xl px-4 pt-6 pb-44"
        id="calculator"
      >
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
            <AddedFoodsSummary
              items={plates}
              onRemove={handleRemoveItem}
              onEdit={handleEditItem}
              onClearAll={handleClearAll}
            />
          </div>
        )}
      </div>

      <TotalMacrosFooter
        totals={totals}
        onClick={() => setShowMealSummary(true)}
      />

      {activeFood && (
        <QuickAdjustPanel
          food={activeFood}
          onClose={() => {
            setActiveFood(null);
            setEditingIndex(null);
          }}
          onAdd={handleAddFood}
          onPreview={handlePreviewFood}
          isEditing={editingIndex !== null}
          initialValues={
            editingIndex !== null
              ? {
                  amount: plates[editingIndex]?.selectedAmount,
                  isRaw: plates[editingIndex]?.isRaw,
                  quantity: plates[editingIndex]?.quantity,
                  selectedSizeId: "custom",
                }
              : undefined
          }
        />
      )}

      {resultItem && (
        <ResultModal item={resultItem} onClose={() => setResultItem(null)} />
      )}

      {showMealSummary && (
        <ResultModal
          item={{
            ...totals,
            name: "My Full Plate",
            nameAr: "وجبتي بالكامل",
            icon: "🍽️",
            selectedAmount: plates.length,
            unit: "items",
          }}
          onClose={() => setShowMealSummary(false)}
        />
      )}

      {toastMessage && (
        <div className="animate-in slide-in-from-top-10 fade-in fixed top-6 left-1/2 z-50 -translate-x-1/2 duration-300">
          <div className="bg-primary text-secondary border-primary/20 flex items-center gap-2 rounded-full border px-6 py-3 font-black shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
            <span className="text-xl">✅</span> {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useState, useMemo } from "react";
import { category, Food } from "@/app/lib/data";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

// Components
import CalculatorHeader from "./_components/Layout/CalculatorHeader";
import FoodListSection from "./_components/Layout/FoodListSection";
import TotalMacrosFooter from "./_components/Layout/TotalMacrosFooter";
import AddedFoodsSummary from "./_components/Layout/AddedFoodsSummary";
import QuickAdjustPanel from "./_components/Layout/QuickAdjustPanel";
import ResultModal from "./_components/Layout/ResultModal";

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
  const [showCart, setShowCart] = useState(false);
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
  const t = useTranslations("HomePage");

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
      showToast(t("toastUpdated", { name: calculated.name }));
    } else {
      addPlate(calculated);
      showToast(t("toastAdded", { name: calculated.name }));
    }
    setActiveFood(null);
  };

  const handlePreviewFood = (calculated: Plate) => {
    if (!calculated) return;
    // Only show the result modal — do NOT silently add to plate.
    // The user must explicitly click "Add to Plate" to commit.
    setResultItem(calculated);
    setActiveFood(null);
  };

  const handleEditItem = (item: Plate, index: number) => {
    setShowCart(false);
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
          setShowCart={setShowCart}
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
            id: "summary",
            ...totals,
            name: "My Full Plate",
            nameAr: "وجبتي بالكامل",
            icon: "🍽️",
            selectedAmount: totals.calories,
            unit: "kcal",
          }}
          onClose={() => setShowMealSummary(false)}
        />
      )}

      {showCart && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
          <div className="animate-in slide-in-from-bottom-full sm:zoom-in-95 flex max-h-[85vh] w-full max-w-[500px] flex-col overflow-y-auto rounded-t-[2.5rem] border border-emerald-500/10 bg-[#04120c] p-6 pb-10 shadow-2xl sm:rounded-[2.5rem] sm:pb-6">
            <div className="mb-6 flex w-full items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-black text-white">
                <span className="text-emerald-400">🍽️</span> {t("yourPlate")}
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            {plates.length > 0 ? (
              <AddedFoodsSummary
                items={plates}
                onRemove={handleRemoveItem}
                onEdit={handleEditItem}
                onClearAll={handleClearAll}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="mb-4 text-4xl opacity-50">🍽️</span>
                <p className="font-bold text-gray-400">{t("plateEmpty")}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {toastMessage && (
        <div
          aria-live="polite"
          data-testid="toast"
          className="animate-in slide-in-from-top-10 fade-in fixed top-6 left-1/2 z-50 -translate-x-1/2 duration-300"
        >
          <div className="bg-primary text-secondary border-primary/20 flex items-center gap-2 rounded-full border px-6 py-3 font-black shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
            <span className="text-xl">✅</span> {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}

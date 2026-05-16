import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReactNode } from "react";

/**
 * Interface representing a food item on the plate.
 * Now includes common optional fields for better type safety.
 */
export interface Plate {
  id: string;
  name: string;
  nameAr?: string;
  icon?: string | ReactNode;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  selectedAmount?: number;
  unit?: string;
  isRaw?: boolean;
  quantity?: number;
  sugarCount?: number;
  sizeType?: string;
  isRawCookedToggle?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface PlatesState {
  plates: Plate[];
  addPlate: (plate: Plate) => void;
  updatePlate: (index: number, plate: Plate) => void;
  removePlate: (plateId: string) => void;
  clearPlates: () => void;
}

/**
 * Zustand store for managing the meal plate with LocalStorage persistence.
 */
export const usePlatesStore = create<PlatesState>()(
  persist(
    (set) => ({
      plates: [],

      addPlate: (plate) =>
        set((state) => ({
          plates: [...(state.plates || []), plate],
        })),

      updatePlate: (index, updatedPlate) =>
        set((state) => {
          const newPlates = [...(state.plates || [])];
          if (index >= 0 && index < newPlates.length) {
            newPlates[index] = updatedPlate;
          }
          return { plates: newPlates };
        }),

      removePlate: (plateId) =>
        set((state) => ({
          plates: (state.plates || []).filter((p) => p && p.id !== plateId),
        })),

      clearPlates: () => set({ plates: [] }),
    }),
    {
      name: "plates-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Interface representing a food item on the plate.
 * We use a flexible object type to ensure all calculated macros are stored.
 */
export interface Plate {
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    [key: string]: any; // Allows additional fields like icon, unit, etc.
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
 * Includes safety guards to prevent null/undefined state during hydration.
 */
export const usePlatesStore = create<PlatesState>()(
    persist(
        (set) => ({
            // --- Initial State ---
            plates: [],

            // --- Actions ---

            /** Adds a new item. Safety check ensures we always work with an array. */
            addPlate: (plate) => set((state) => ({
                plates: [...(state.plates || []), plate]
            })),

            /** Replaces an item at a specific index (used for editing) */
            updatePlate: (index, updatedPlate) => set((state) => {
                const newPlates = [...(state.plates || [])];
                if (index >= 0 && index < newPlates.length) {
                    newPlates[index] = updatedPlate;
                }
                return { plates: newPlates };
            }),

            /** Removes an item by its ID */
            removePlate: (plateId) => set((state) => ({
                plates: (state.plates || []).filter((p) => p && p.id !== plateId)
            })),

            /** Resets the entire plate */
            clearPlates: () => set({ plates: [] }),
        }),
        {
            name: "plates-storage",
            storage: createJSONStorage(() => localStorage)
        }
    )
);
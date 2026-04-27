import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Plate = {
    id: string;
    name: string;
}

/**
 * Interface defining the state and actions for the Plates Store
 */
interface PlatesState {
    plates: Plate[];            // List of saved plates
    setPlates: (plates: Plate[]) => void;
    addPlate: (plate: Plate) => void;
    removePlate: (plateId: string) => void;
    clearPlates: () => void;
}

/**
 * Store for managing multiple plates with persistence.
 */
export const usePlatesStore = create<PlatesState>()(
    persist(
        (set) => ({
            plates: [],

            // Actions
            /** Overwrites the entire plates list */
            setPlates: (plates: Plate[]) => set({ plates }),

            /** Appends a new plate to the existing list */
            addPlate: (plate: Plate) => set((state) => ({
                plates: [...state.plates, plate]
            })),

            /** Removes a plate by its unique ID */
            removePlate: (plateId: string) => set((state) => ({
                plates: state.plates.filter((p) => p.id !== plateId)
            })),

            /** Resets the plates list */
            clearPlates: () => set({ plates: [] }),
        }),
        {
            name: "plates-storage", // Unique key in localStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);
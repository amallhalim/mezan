import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set) => ({
            name: "",
            setName: (name: string) => set({ name }),
            clearUser: () => set({ name: "" }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),

        }

    )
)

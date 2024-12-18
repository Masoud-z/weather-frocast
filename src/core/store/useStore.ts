import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Units } from "@/core/enums/units";

export interface StoreState {
  unit: Units;
}

const useStore = create<StoreState, [["zustand/persist", { posts: Units }]]>(
  persist(
    (set, get) => ({
      unit: Units.Metric,
      setUnit: (unit: Units) => set({ unit }),
    }),
    {
      name: "unit",
      partialize: (state) => ({ posts: state.unit }), // Persist only the unit}
    }
  )
);

export default useStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Units } from "@/core/enums/units";

export interface StoreState {
  unit: Units;
  setUnit: (unit: Units) => void;
}

const useStore = create<StoreState, [["zustand/persist", { unit: Units }]]>(
  persist(
    (set, get) => ({
      unit: get()?.unit || Units.Metric,
      setUnit: (unit: Units) => set((state) => ({ unit })),
    }),
    {
      name: "unit",
      partialize: (state) => ({ unit: state.unit }), // Persist only the unit}
    }
  )
);

export default useStore;

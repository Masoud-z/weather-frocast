import { create } from "zustand";
import { Units } from "@/core/enums/units";

export interface StoreState {
  unit: Units;
}

const useStore = create<StoreState>((set) => ({
  unit: Units.Metric,
  setUnit: (unit: Units) => set({ unit }),
}));

export default useStore;

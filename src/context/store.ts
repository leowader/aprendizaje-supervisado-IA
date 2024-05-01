import { create } from "zustand";

export interface typeConfig {
  w: number[][];
  u: number[];
}
export type AuthStore = {
  config: typeConfig;
  setConfig: (newConfig: typeConfig) => void;
};
export const useConfigStorage = create<AuthStore>((set) => ({
  config: { w: [[1, 0, 1]], u: [1, 0, 1] },

  setConfig: (newConfig: typeConfig) => {
    set((state) => ({
      config: newConfig,
    }));
  },
}));

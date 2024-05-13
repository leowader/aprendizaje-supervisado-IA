import { create } from "zustand";
export interface typeConfig {
  w: number[][];
  u: number[];
}
export type AuthStore = {
  config: typeConfig;
  setConfig: (newConfig: typeConfig) => void;
  numeroCapas: number;
  fa: string[];
  pesosCargados: boolean;
  setPesosCargados: () => void;
  setCapas: (capas: number, fa: string[]) => void;
  algortimo: string;
  setAlgoritmo: (algortimo: string) => void;
};
export const useConfigStorage = create<AuthStore>((set) => ({
  config: { w: [[1, 0, 1]], u: [1, 0, 1] },
  setCapas: (numero: number, fa: string[]) => {
    set(() => ({
      numeroCapas: numero,
      fa: fa,
    }));
  },
  setPesosCargados: () => {
    set(() => ({
      pesosCargados: true,
    }));
  },
  fa: ["sigmoide"],
  algortimo: "Backpropagation Primitivo",
  pesosCargados: false,
  numeroCapas: 0, //estado inicial
  setConfig: (newConfig: typeConfig) => {
    set(() => ({
      config: newConfig,
    }));
  },
  setAlgoritmo: (algortimoSelect: string) => {
    set(() => ({
      algortimo: algortimoSelect,
    }));
  },
}));

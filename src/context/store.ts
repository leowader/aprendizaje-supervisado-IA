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
  numCapa1:number,
  numCapa2:number,
  numCapa3:number,
  setNumeroEntradas: (numero: number,salidas:number,capa1:number,capa2:number,capa3:number) => void;
  numEntradas: number;
  numSalidas:number
  pesosCargados: boolean;
  setPesosCargados: () => void;
  setCapas: (capas: number, fa: string[]) => void;
  algortimo: string;
  setNumeroCpas:(numero:number)=>void
  setAlgoritmo: (algortimo: string) => void;
};
export const useConfigStorage = create<AuthStore>((set) => ({
  config: { w: [[1, 0, 1]], u: [1, 0, 1] },
  numEntradas: 0,
  numSalidas:0,
  numCapa1:0,
  numCapa2:0,
  numCapa3:0,
  setNumeroCpas:(numero:number)=>{
    set(() => ({
      numeroCapas: numero,
     
    }));
  },
  setCapas: (numero: number, fa: string[]) => {
    set(() => ({
      numeroCapas: numero,
      fa: fa,
    }));
  },
  setNumeroEntradas: (numeroEntradas:number,numeroSalidas: number,capa1:number,capa2:number,capa3:number) => {
    set(() => ({
      numEntradas: numeroEntradas,
      numSalidas:numeroSalidas,
      numCapa1:capa1,
      numCapa2:capa2,
      numCapa3:capa3
      
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

import { Data } from "../interfaces/interfaceData";
import { TraerPesosYumbrales } from "./guardarPesos";

export const Simular = (data: Data, entradas: number[][]) => {
  const { u, w } = TraerPesosYumbrales();
  const { salidas, numEntradas, numSalidas,numPatrones } = data;
  let Si = 0; //sumatoria de las salidas * pesos
  const salidasRed = [];
  const salidasRedNeu: number[][] = [];
  for (let h = 0; h < numPatrones; h++) {
    salidasRedNeu.push([]);
    for (let i = 0; i < numSalidas; i++) {
      for (let j = 0; j < numEntradas; j++) {
        Si += entradas[h][j] * w[j][i]; //el 0 debe cambiar en este caso 0===primer patron [0,0,0]
      }
      const salidaSoma = Si - u[i]; // restamos el umbral
      salidasRed.push(+salidaSoma.toFixed(1)); //guardando salida de la funcion soma
      if (salidaSoma >= 0) {
        salidasRedNeu[h][i] = 1;
      } else {
        salidasRedNeu[h][i] = 0;
      }
      Si = 0; //reiniciamos la suma
    }
  }
  // ciclo para aplicar la funcion de activacion
  for (let i = 0; i < salidasRed.length; i++) {
    if (salidasRed[i] >= 0) {
      salidasRed[i] = 1;
    } else {
      salidasRed[i] = 0;
    }
  }
  console.log("salidas deseada", salidas);
  console.log("salida de la red neurnal ", salidasRedNeu);
};

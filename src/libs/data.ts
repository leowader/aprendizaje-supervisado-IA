import { Data } from "../interfaces/interfaceData";
export const data: Data = 
  {
    numEntradas: 3,
    children:"",
    numSalidas: 2,
    numPatrones: 4,
    W: [
      [0.6, 0.9],
      [0.1, -0.4],
      [0.9, 0.4],
    ],
    U: [-0.6, 0.3],
    cabeceras: ["X1", "X2", "X3", "YD1", "YD2"],
    salidas: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    entradas: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
    ],
  }

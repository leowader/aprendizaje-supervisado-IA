import { comparation, typeConfigRes } from "../interfaces/interfaceData";
export const buscarConfiguracion = (data: typeConfigRes[], id: string) => {
  return data.find((data) => data._id === id);
};
export const buscarArchivo = (data:any,name:string) => {  
  return data.find((data:any) => data.name === name);
};
import { FuncionWyU } from "../interfaces/interfaceData";
export async function GuardarPesos(w: number[][], u: number[]) {
  try {
    const pesos = JSON.stringify(w);
    localStorage.setItem("w", pesos);
    const umbrales = JSON.stringify(u);
    localStorage.setItem("u", umbrales);
  } catch (error) {
    console.log(error);
  }
}
export const TraerPesosYumbrales: FuncionWyU = () => {
  const w = localStorage.getItem("w");
  const u = localStorage.getItem("u");
  return { w: JSON.parse(w!), u: JSON.parse(u!) };
};
export function generarValoresAleatorios(
  numEntradas: number,
  numSalidas: number
): number[][] {
  const valores: number[][] = [];
  for (let i = 0; i < numEntradas; i++) {
    const fila: number[] = [];
    for (let j = 0; j < numSalidas; j++) {
      fila.push(+(Math.random() * 2 - 1).toFixed(1)); // Genera un número aleatorio entre -1 y 1
    }
    valores.push(fila);
  }
  return valores;
}
export const graficarVs = (salida: number[][], salidaDeseada: number[][]) => {
  let arraySalida: comparation[] = [];
  if (salidaDeseada) {
    for (let i = 0; i < salida.length; i++) {
      for (let j = 0; j < salida[0].length; j++) {
        arraySalida.push({
          yd: `salida [${i + 1},${j + 1}]`,
          "Salida Red": salida[i][j],
          "Salida Deseada": salidaDeseada[i][j],
        });
      }
    }
  }
  return arraySalida;
};
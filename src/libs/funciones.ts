import { typeConfigRes } from "../interfaces/interfaceData";

export const buscarConfiguracion = (data: typeConfigRes[], id: string) => {
  return data.find((data) => data._id === id);
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

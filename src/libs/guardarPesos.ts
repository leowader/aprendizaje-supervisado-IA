// import axios from "axios";
import { FuncionWyU } from "../interfaces/interfaceData";
export async function GuardarPesos(w: number[][], u: number[]) {
  try {
    const pesos = JSON.stringify(w);
    localStorage.setItem("w", pesos);
    const umbrales = JSON.stringify(u);
    localStorage.setItem("u", umbrales);
    // const response = await axios.post("http://127.0.0.1:8000/save", {
    //   valueW: w,
    //   valueU: u,
    // });
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
}
export const TraerPesosYumbrales: FuncionWyU = () => {
  const w = localStorage.getItem("w");
  const u = localStorage.getItem("u");
  return { w: JSON.parse(w!), u: JSON.parse(u!) };
};

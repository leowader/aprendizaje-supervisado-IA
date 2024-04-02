import axios from "axios";

export async function GuardarPesos(w: number[][], u: number[]) {
  try {
    const pesos = JSON.stringify(w);
    localStorage.setItem("w", pesos);
    const WyU = {
      valueW: w,
      valueU: u,
    };
    const response=await axios.post("http://127.0.0.1:8000/save", WyU);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
export function GuardarUmbrales(u: number[]) {
  const umbrales = JSON.stringify(u);
  localStorage.setItem("u", umbrales);
}

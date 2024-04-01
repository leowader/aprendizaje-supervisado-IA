export function GuardarPesos(w: number[][]) {
  const pesos = JSON.stringify(w);
  localStorage.setItem("w", pesos);
}
export function GuardarUmbrales(u: number[]) {
    const umbrales = JSON.stringify(u);
    localStorage.setItem("u", umbrales);
  }
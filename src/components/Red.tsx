import { useRef, useEffect, FC } from "react";
import { drawOneLayer, drawTwoLayers } from "../libs/dibujarRed";
import { drawThreeLayers } from "../libs/dibujarRedC3";
import { TypeDraw } from "../interfaces/interfaceData";
const Draw: FC<TypeDraw> = ({
  entradas,
  salidas,
  numcapas,
  numcapa2 = 2,
  numCapas3 = 1,
  nuevoConjuntoEntradas = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 200;
    const height = Math.max(
      (entradas + salidas) * 60,
      nuevoConjuntoEntradas * 2.5 * 35
    ); // Asegura que el canvas sea lo suficientemente alto para ambos conjuntos de entradas

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const colorEntradas = "#1E1E1E";
    const colorSalidas = "#1E1E1E";
    ctx.fillStyle = colorEntradas;
    ctx.font = "15px Arial ";
    if (numcapas === 1) {
      drawOneLayer(ctx, width, entradas, nuevoConjuntoEntradas, salidas);
    }
    if (numcapas === 2) {
      drawTwoLayers(
        ctx,
        width,
        entradas,
        nuevoConjuntoEntradas,
        salidas,
        numcapa2
      );
    }
    if (numcapas === 3) {
      drawThreeLayers(
        ctx,
        width,
        entradas,
        nuevoConjuntoEntradas,
        salidas,
        numcapa2,
        numCapas3
      );
    }
    // Dibujar círculos para el nuevo conjunto de entradas
    for (let i = 0; i < nuevoConjuntoEntradas; i++) {
      ctx.beginPath();
      ctx.arc(150, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja círculos en una posición x diferente
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.fillText("N" + (i + 1), 142, 50 * (i + 1) + 5);
      ctx.fillStyle = "#1E1E1E";
    }
    // Dibujar círculos para las salidas
    ctx.fillStyle = colorSalidas;
    for (let i = 0; i < salidas; i++) {
      ctx.beginPath();
      ctx.arc(width - 50, 50 * (i + 1), 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#29BB5F";
      ctx.fillText("Y" + (i + 1), width - 58, 50 * (i + 1) + 5);
      ctx.fillStyle = colorSalidas;
    }
    // Dibujar círculos para el primer conjunto de entradas

    for (let i = 0; i < entradas; i++) {
      ctx.beginPath();
      ctx.arc(50, 50 * (i + 1), 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#8E2FE3";
      ctx.fillText("X" + (i + 1), 42, 50 * (i + 1) + 5);
      ctx.fillStyle = colorEntradas;
    }
  }, [entradas, salidas, nuevoConjuntoEntradas]);

  return (
    <div className="flex justify-center flex-col items-center ">
      <h1 className="text-[40px] z-[100]">
        Red <span className="text-[#8E2FE3]">Neuronal Artificial</span>{" "}
      </h1>
      <canvas
        className="rounded-lg backdrop-blur-[2px]"
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      ></canvas>
    </div>
  );
};
export default Draw;
export const drawOneLayer = (
  ctx: CanvasRenderingContext2D,
  width: number,
  entradas: number,
  nuevoConjuntoEntradas: number,
  salidas: number
) => {
  // Función para dibujar cuando numcapas === 1
  //capa entrada y capa 1
  ctx.strokeStyle = "white";
  for (let i = 0; i < entradas; i++) {
    for (let j = 0; j < nuevoConjuntoEntradas; j++) {
      ctx.beginPath();
      ctx.moveTo(50, 50 * (i + 1));
      ctx.lineTo(150, 50 * (j + 1));
      ctx.stroke();
    }
  }
  //capa 1 y capa de salida
  // Conectar entradas del nuevo conjunto con salidas
  ctx.strokeStyle = "white";
  for (let i = 0; i < nuevoConjuntoEntradas; i++) {
    for (let j = 0; j < salidas; j++) {
      ctx.beginPath();
      ctx.moveTo(150, 50 * (i + 1));
      ctx.lineTo(width - 50, 50 * (j + 1));
      ctx.stroke();
    }
  }
};
export const drawTwoLayers = (
  ctx: CanvasRenderingContext2D,
  width: number,
  entradas: number,
  nuevoConjuntoEntradas: number,
  salidas: number,
  numcapa2: number
) => {
  // Función para dibujar cuando numcapas === 2
  ctx.strokeStyle = "white";
  for (let i = 0; i < entradas; i++) {
    for (let j = 0; j < nuevoConjuntoEntradas; j++) {
      ctx.beginPath();
      ctx.moveTo(50, 50 * (i + 1));
      ctx.lineTo(150, 50 * (j + 1));
      ctx.stroke();
    }
  }
  //LINEAS CAPA 1 Y CAPA 2
  ctx.strokeStyle = "white";
  for (let i = 0; i < nuevoConjuntoEntradas; i++) {
    for (let j = 0; j < numcapa2; j++) {
      ctx.beginPath();
      ctx.moveTo(150, 50 * (i + 1));
      ctx.lineTo(width - 200, 50 * (j + 1));
      ctx.stroke();
    }
  }
  //cpaa 2 y capa de salida
  ctx.strokeStyle = "white";
  for (let i = 0; i < numcapa2; i++) {
    for (let j = 0; j < salidas; j++) {
      ctx.beginPath();
      ctx.moveTo(250, 50 * (i + 1));
      ctx.lineTo(width - 50, 50 * (j + 1));
      ctx.stroke();
    }
  }
  //circulo capa 2
  for (let i = 0; i < numcapa2; i++) {
    ctx.beginPath();
    ctx.arc(250, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja círculos en una posición x diferente
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText("N" + (i + 1), 242, 50 * (i + 1) + 5);
    ctx.fillStyle = "#1E1E1E";
  }
};
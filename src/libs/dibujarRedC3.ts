export const drawThreeLayers = (
    ctx: CanvasRenderingContext2D,
    width: number,
    entradas: number,
    nuevoConjuntoEntradas: number,
    salidas: number,
    numcapa2: number,
    numCapas3: number
  ) => {
    // Función para dibujar cuando numcapas === 3
    //linea capa de entrada y capa 1
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
    //LINEAS CAPA 2 Y CAPA salida
    ctx.strokeStyle = "white";
    for (let i = 0; i < salidas; i++) {
      for (let j = 0; j < numCapas3; j++) {
        ctx.beginPath();
        ctx.moveTo(425, 50 * (i + 1));
        ctx.lineTo(width - 140, 50 * (j + 1));
        ctx.stroke();
      }
    }
    //cpaa 2 y capa de salida
    ctx.strokeStyle = "white";
    console.log("capas 3", numCapas3);
  
    for (let i = 0; i < numcapa2; i++) {
      for (let j = 0; j < numCapas3; j++) {
        ctx.beginPath();
        ctx.moveTo(250, 50 * (i + 1));
        ctx.lineTo(width - 150, 50 * (j + 1));
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
    //circulo capa 3
    for (let i = 0; i < numCapas3; i++) {
      ctx.beginPath();
      ctx.arc(330, 50 * (i + 1), 20, 0, 2 * Math.PI); // Dibuja círculos en una posición x diferente
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.fillText("N" + (i + 1), 322, 50 * (i + 1) + 5);
      ctx.fillStyle = "#1E1E1E";
    }
  };
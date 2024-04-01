import { Data } from "../interfaces/interfaceData";
import { generarValoresAleatorios } from "./generarWyU";
import { GuardarPesos, GuardarUmbrales } from "./guardarPesos";
export   function entrenar(data: Data, rata: number, erroMaximoPer: number) {
  const { entradas, salidas, numEntradas, numSalidas, numPatrones } = data;
  let w = data.W;
  let u = data.U;
  let ErrorIteracion = 1;
  const totalErroreI = [];
  let prevError = null;
  let Si = 0; //sumatoria de las salidas * pesos
  let erroresLineales: number[] = [];
  let errorPatrones: number[] = [];
  for (let m = 0; m < 100; m++) {
    if (ErrorIteracion <= erroMaximoPer) {
      alert(
        `Estoy entrenado mi bro iteracion ${m}, error i:${ErrorIteracion} `
      );
      GuardarPesos(w);
      GuardarUmbrales(u);
      break;
    }
    for (let h = 0; h < numPatrones; h++) {
      const salidasRed = [];
      if (prevError === ErrorIteracion || prevError! > ErrorIteracion) {
        // Si los errores son iguales, generamos nuevos valores aleatorios para w y u
        w = generarValoresAleatorios(numEntradas, numSalidas);
        u = generarValoresAleatorios(1, numSalidas)[0]; // Solo necesitamos un umbral para cada salida
      }
      prevError = ErrorIteracion;
      for (let i = 0; i < numSalidas; i++) {
        for (let j = 0; j < numEntradas; j++) {
          Si += entradas[h][j] * w[j][i]; //el 0 debe cambiar en este caso 0===primer patron [0,0,0]
        }
        const salidaSoma = Si - u[i]; // restamos el umbral
        salidasRed.push(+salidaSoma.toFixed(1)); //guardando salida de la funcion soma
        Si = 0; //reiniciamos la suma
      }
      // ciclo para aplicar la funcion de activacion
      for (let i = 0; i < salidasRed.length; i++) {
        if (salidasRed[i] >= 0) {
          salidasRed[i] = 1;
        } else {
          salidasRed[i] = 0;
        }
      }
      // ciclo para calcular los errores lineales
      for (let i = 0; i < numSalidas; i++) {
        const eli = salidas[h][i] - salidasRed[i]; //error lineal en la salida de la red 0 osea primer patron, el 0 debe cambiar en este caso 0===primer patron [0,0,0]
        erroresLineales.push(eli);
      }
      // sumar errores lineales
      let sumaErroreslineales = 0;
      let ep = 0; //error en el patron
      for (let i = 0; i < erroresLineales.length; i++) {
        sumaErroreslineales += Math.abs(erroresLineales[i]);
      }
      ep = sumaErroreslineales / numSalidas; //calculamos el error en el patron 0
      errorPatrones.push(ep); //lo añadimos a una lista de errores en patrones
      // aplicamos algoritmo de entrenamiento
      // calculamos el nuevo peso (W)
      for (let i = 0; i < numSalidas; i++) {
        for (let j = 0; j < numEntradas; j++) {
          const nuevoPeso =
            w[j][i] + rata * erroresLineales[i] * entradas[h][j]; //calculamos el nuevo peso el 0
          w[j][i] = +nuevoPeso.toFixed(1); //aactualizamo los pesos
        }
        // calculamos el nuevo umbral
        const nuevoUmbral = u[i] + rata * erroresLineales[i] * 1;
        //actualizamos umbrals
        u[i] = +nuevoUmbral.toFixed(1);
      }
      erroresLineales = []; //reiniciamos los errores lineales
      // calculamos el error de la iteracion(una iteracion se termina cuando se presentan todos los patrones,es decir cuando termina el ciclo de h)
      let sumaErroresPatrones = 0;
      for (let i = 0; i < errorPatrones.length; i++) {
        sumaErroresPatrones += errorPatrones[i];
      }
      ErrorIteracion = sumaErroresPatrones / numPatrones;
    }
    totalErroreI.push(ErrorIteracion);

    errorPatrones = [];
  }
  console.log("ultimo peso", w);
  console.log("ultimo umbral", u);
  console.log("ERRORE ITERACIONES", totalErroreI);
}

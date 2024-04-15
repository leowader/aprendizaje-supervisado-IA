import { Data, FuncionParametro } from "../interfaces/interfaceData";
import { generarValoresAleatorios } from "./generarWyU";
import { GuardarPesos } from "./guardarPesos";
export function entrenar(
  data: Data,
  rata: number,
  erroMaximoPer: number,
  cargarDatosChart: FuncionParametro,
  iteraciones: number
) {
  const { entradas, salidas, numEntradas, numSalidas, numPatrones } = data;
  let w = data.W;
  let u = data.U;
  let ErrorIteracion: number = 1;
  let ErroresItecarion = [];
  let Si = 0; //sumatoria de las salidas * pesos
  let erroresLineales: number[] = [];
  let errorPatrones: number[] = [];
  for (let m = 0; m < iteraciones; m++) {
    for (let h = 0; h < numPatrones; h++) {
      const salidasRed = [];
      for (let i = 0; i < numSalidas; i++) {
        for (let j = 0; j < numEntradas; j++) {
          Si += entradas[h][j] * w[j][i]; //el 0 debe cambiar en este caso 0===primer patron [0,0,0]
        }
        const salidaSoma = Si - u[i]; // restamos el umbral
        salidasRed.push(+salidaSoma); //guardando salida de la funcion soma
        salidasRed[i] >= 0 ? (salidasRed[i] = 1) : (salidasRed[i] = 0);
        Si = 0; //reiniciamos la suma
        const eli = salidas[h][i] - salidasRed[i]; //error lineal en la salida de la red
        erroresLineales.push(eli);
      }
      let sumaErroreslineales = 0;
      let ep = 0; //error en el patron
      for (let i = 0; i < erroresLineales.length; i++) {
        sumaErroreslineales += Math.abs(erroresLineales[i]);
      }
      ep = sumaErroreslineales / numSalidas; //calculamos el error en el patron 0
      errorPatrones.push(ep); //lo añadimos a una lista de errores en patrones
      for (let i = 0; i < numSalidas; i++) {
        for (let j = 0; j < numEntradas; j++) {
          const nuevoPeso =
            w[j][i] + rata * erroresLineales[i] * entradas[h][j]; //calculamos el nuevo peso el 0
          w[j][i] = +nuevoPeso.toFixed(1); //aactualizamo los pesos
        }
        const nuevoUmbral = u[i] + rata * erroresLineales[i] * 1; //calculamos el nuevo umbral
        u[i] = +nuevoUmbral.toFixed(1); //actualizamos umbrals
      }
      erroresLineales = []; //reiniciamos los errores lineales
      let sumaErroresPatrones = 0;
      for (let i = 0; i < errorPatrones.length; i++) {
        sumaErroresPatrones += errorPatrones[i];
      }
      ErrorIteracion = sumaErroresPatrones / numPatrones;
    }
    ErroresItecarion.push(+ErrorIteracion);
    errorPatrones = [];
    if (m === iteraciones - 1) {
      console.log("termine");
    }
    console.log("ciclo ", m, "error: ", ErrorIteracion);
    if (+ErroresItecarion[m] <= +erroMaximoPer) {
      alert("Entrenamiento completado correctamente");
      GuardarPesos(w, u);
      cargarDatosChart(ErroresItecarion);
      break;
    }
    if (+ErrorIteracion.toFixed(3) === +ErroresItecarion[m].toFixed(3)) {
      // Si los errores son iguales, generamos nuevos valores aleatorios para w y u
      w = generarValoresAleatorios(numEntradas, numSalidas);
      u = generarValoresAleatorios(1, numSalidas)[0]; // Solo necesitamos un umbral para cada salida
    }
  }
  if (ErroresItecarion[ErroresItecarion.length - 1] > erroMaximoPer) {
    ErroresItecarion = [];
    alert("No se realizo el entrenamiento intente nuevamente");
  }
}

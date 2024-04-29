import { useEffect, useState } from "react";
import { Data, typeChart } from "../interfaces/interfaceData";
import { io } from "socket.io-client";
import { AreaChartHero } from "./Chart";
import { GuardarPesos, TraerPesosYumbrales } from "../libs/guardarPesos";
const socket = io("http://localhost:4000");
function VerData(dataBanco: Data) {
  const [iteracion, setIteracion] = useState(0);
  const [errorMaximo, setErrorMaximo] = useState(0);
  const [rata, setRata] = useState(0);
  const [errores, setErrrores] = useState<typeChart[]>([]);
  const [guardar, setGuardar] = useState({ w: [], u: [] });
  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("graficas", (grafica) => {
      if (grafica.w != "") {
        console.log(grafica);
        setGuardar({ u: grafica.u, w: grafica.w });
      }
      setErrrores((data) => [...data, grafica]);
    });
    return () => {
      socket.off("graficas");
      socket.off("connect");
    };
  }, []);
  const guardarUltimosWyU = () => {
    alert("se guardaron los ultimos pesos temporalmente");
    GuardarPesos(guardar.w, guardar.u);
  };
  const handleClick = () => {
    setErrrores([]);
    socket.emit("graficas", {
      mensaje: "empieza a graficar bro",
      data: dataBanco,
      rata: rata,
      algoritmo: 2,
      iteracion: iteracion,
      errorMaximo: errorMaximo,
    });
  };
  const cancelar = () => {
    socket.emit("cancelar", {
      mensaje: "cancela las ieteraciones",
    });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-2">
      <div className="bg-black w-full bg-opacity-20 p-4   rounded-lg">
        <form className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Parametros de entrenamiento</h2>
          <div className="flex  gap-6 justify-between">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Numero de iteraciones
              </label>
              <input
                type="range"
                min={0}
                max={5000}
                step={"100"}
                onChange={(e) => setIteracion(+e.target.value)}
                className="w-full h-2 bg-black bg-opacity-30 rounded-lg appearance-none cursor-pointer "
              ></input>
              <span>Valor : {iteracion}</span>
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Error maximo permitido
              </label>
              <input
                type="range"
                min={0.01}
                max={0.1}
                step={"0.01"}
                onChange={(e) => setErrorMaximo(+e.target.value)}
                // {...register("iteraciones")}
                className="w-full h-2 bg-black bg-opacity-30 rounded-lg appearance-none cursor-pointer "
              ></input>
              <span>Valor : {errorMaximo}</span>
            </div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Rata de Aprendizaje
              </label>
              <input
                type="range"
                min={0.01}
                max={1}
                step={"0.01"}
                onChange={(e) => setRata(+e.target.value)}
                // {...register("iteraciones")}
                className="w-full h-2 bg-black bg-opacity-30 rounded-lg appearance-none cursor-pointer "
              ></input>
              <span>Valor : {rata}</span>
            </div>
          </div>
        </form>
        <button
          className="text-white bg-gradient-to-r  from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 me-2 "
          onClick={handleClick}
        >
          Entrenar
        </button>
        <button onClick={cancelar} className="p-2 bg-black rounded-lg">
          cancelar
        </button>
      </div>
      <AreaChartHero
        funcion={guardarUltimosWyU}
        datachart={errores}
      ></AreaChartHero>
    </div>
  );
}
export default VerData;

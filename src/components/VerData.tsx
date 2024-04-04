import { useState } from "react";
import { Data, typeChart } from "../interfaces/interfaceData";
import { entrenar } from "../libs/Entrenar";
import { AreaChartHero } from "./Chart";
function VerData(dataBanco: Data) {
  const [datosGrafica, setDatosGrafica] = useState<typeChart[]>([]);
  const cargarDataChart = (dataChart: number[]) => {
    const datos: typeChart[] = [];
    for (let i = 0; i < dataChart.length; i++) {
      datos.push({ error: dataChart[i], iteracion: `ieteracion ${i}` });
    }
    setDatosGrafica(datos);
  };
  const handleClick = () => {
    entrenar(dataBanco, 0.7, 0.1, cargarDataChart);//entrenamiento de la red(databanco,rata,errormaximo,funcion)
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="text-white bg-gradient-to-r w-28 from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleClick}
      >
        Entrenar
      </button>
      {datosGrafica.length > 0 ? (
        <>
          <AreaChartHero datachart={datosGrafica}></AreaChartHero>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default VerData;

import "@fontsource/schoolbell";
import { useState } from "react";
import React from "react";
import { enviarFile } from "./api/axios";
import { Data } from "./interfaces/interfaceData";
import VerData from "./components/VerData";
import { InputFile } from "./components/InputFile";
import { Parametros } from "./components/Parametros";
import { Simular } from "./libs/simulacion";
import { SimulacionSalidas } from "./components/Simulacion";
function App() {
  const [file, setFile] = useState<File>();
  const [fileSimulaion, setFileSimulacion] = useState<File>();
  const [salidaRed, setSalidasRed] = useState<number[][]>([]);
  const [dataSimulacion, setDataSimulacion] = useState({
    entradas: [],
  });
  const [data, setData] = useState<Data>({
    numEntradas: 0,
    numSalidas: 0,
    children: "",
    numPatrones: 0,
    W: [],
    U: [],
    cabeceras: [],
    salidas: [],
    entradas: [],
  });
  const handleInputFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const res = await enviarFile(selectedFile, "file");
      console.log("res bac", res?.data);

      if (res?.data) {
        setData(res.data[0]);
      }
    }
  };
  const handleInputFileSimulacion = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFileSimulacion(selectedFile);
      const res = await enviarFile(selectedFile, "simular");

      if (res?.data) {
        setDataSimulacion(res.data[0]);
      }
    }
  };

  const onSimular = () => {
    if (dataSimulacion.entradas.length > 0) {
      setSalidasRed(Simular(data, dataSimulacion.entradas));
      alert("Simulacion realizada");
    }
  };
  return (
    <div className="flex justify-center flex-col w-full items-center gap-2 ">
      <h1 className="text-[70px]">
        Aprendizaje <span className="text-[#8E2FE3]">supervisado</span>{" "}
      </h1>
      <h2>carga tu banco de datos</h2>
      <div className="flex gap-5">
        <InputFile
          handleInputFile={handleInputFile}
          name={file ? file.name : ""}
        ></InputFile>
        <Parametros
          numEntradas={data.numEntradas}
          numPatrones={data.numPatrones}
          numSalidas={data.numSalidas}
        >
          {" "}
        </Parametros>
      </div>
      <VerData
        salidas={data?.salidas}
        entradas={data.entradas}
        cabeceras={data.cabeceras}
        W={data.W}
        U={data.U}
        numEntradas={data.numEntradas}
        numSalidas={data.numSalidas}
        numPatrones={data.numPatrones}
      >
        {" "}
      </VerData>
      <h2 className="text-[70px]">
        Simulacion <span className="text-[#8E2FE3]">de salidas</span>{" "}
      </h2>
      <h2>carga tu banco de datos</h2>
      <InputFile
        handleInputFile={handleInputFileSimulacion}
        name={fileSimulaion ? fileSimulaion.name : ""}
      ></InputFile>
      <button
        className="text-white bg-gradient-to-r mt-5 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={onSimular}
      >
        Simular
      </button>
      {salidaRed.length > 0 && (
        <SimulacionSalidas
          salidaDeseadas={data.salidas}
          salidasRed={Simular(data, dataSimulacion.entradas)}
        ></SimulacionSalidas>
      )}
    </div>
  );
}
export default App;

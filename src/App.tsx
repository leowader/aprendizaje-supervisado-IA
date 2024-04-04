import "@fontsource/schoolbell";
import { useState } from "react";
import React from "react";
import { enviarFile } from "./api/axios";
import { Data } from "./interfaces/interfaceData";
import VerData from "./components/VerData";
import { InputFile } from "./components/InputFile";
import { Parametros } from "./components/Parametros";
import { Simular } from "./libs/simulacion";
function App() {
  const [file, setFile] = useState<File>();
  const [fileSimulaion, setFileSimulacion] = useState<File>();
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
  if (dataSimulacion.entradas.length>0) {
    Simular(data, dataSimulacion.entradas);
  }

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
      <InputFile
        handleInputFile={handleInputFileSimulacion}
        name={fileSimulaion ? fileSimulaion.name : ""}
      ></InputFile>
    </div>
  );
}

export default App;

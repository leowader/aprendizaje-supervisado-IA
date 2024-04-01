import "@fontsource/schoolbell";
import { useState } from "react";
import React from "react";
import { enviarFile } from "./api/axios";
import { Data } from "./interfaces/interfaceData";
import VerData from "./components/VerData";

function App() {
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<Data>({
    numEntradas: 0,
    numSalidas: 0,
    children:"",
    numPatrones: 0,
    W: [],
    U: [],
    cabeceras: [],
    salidas: [],
    entradas: [],
  });
  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleclick = async () => {
    console.log("file selec", file);
    if (file) {
      const res = await enviarFile(file);
      console.log("respuesa bacj",res?.data);
      
      if (res?.data) {
        setData(res.data[0]);
      }
    }
  };
  return (
    <div className="flex justify-center flex-col w-full items-center gap-2">
      <h1 className="text-[70px]">Entrenamiento</h1>

      <div className="flex items-center justify-center w-96">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
            <span>{file?.name}</span>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleInputFile}
          />
        </label>
      </div>
      <button className="bg-black p-2 rounded-lg" onClick={handleclick}>
        enviar
      </button>

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
    </div>
  );
}

export default App;

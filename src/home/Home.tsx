import React from "react";
import "@fontsource/schoolbell";
import { useEffect, useState } from "react";
import { getConfigurations } from "../api/axios";
import {
  Data,
  typeConfigRes,
  typeConfigZustand,
} from "../interfaces/interfaceData";
import VerData from "../components/VerData";
import { InputFile } from "../components/InputFile";
import { Parametros } from "../components/Parametros";
import { SimulacionSalidas } from "../components/Simulacion";
import Formulario from "../components/Formulario";
import { LineChartHero } from "../components/ChartSimulation";
import { Select, SelectItem } from "@tremor/react";
import { buscarConfiguracion, graficarVs } from "../libs/funciones";
import {
  handleInputFile,
  handleInputFileSimulacion,
  onSimular,
} from "../libs/handleFuntions";
import { useConfigStorage } from "../context/store";
import { Flip, ToastContainer } from "react-toastify";
const Home = () => {
  const [file, setFile] = useState<File>();
  const [fileSimulaion, setFileSimulacion] = useState<File>();
  const [salidaRed, setSalidasRed] = useState<number[][]>([]);
  const [config, setCongig] = useState<typeConfigRes>();
  const [redes, setRedes] = useState<typeConfigRes[]>([]);
  const [dataSimulacion, setDataSimulacion] = useState({
    entradas: [],
  });
  const [tipoBanco, setTypoBanco] = useState("binary");
  const setCapas = useConfigStorage((state) => state.setCapas);
  const setConfig = useConfigStorage((state) => state.setConfig);
  const { w, u } = useConfigStorage((state) => state.config);
  const numberCapas = useConfigStorage((state) => state.numeroCapas);
  const fa = useConfigStorage((state) => state.fa);
  const [configuration, setConfiguration] = useState<typeConfigZustand>();
  const handleConfiguration = (data: typeConfigZustand) => {
    setConfiguration(data);
  };
  const [data, setData] = useState<Data>({
    numEntradas: 0,
    numSalidas: 0,
    children: "",
    numPatrones: 0,
    w: [],
    u: [],
    cabeceras: [],
    salidas: [],
    fa: [],
    numeroCapas: 0,
    entradas: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await getConfigurations();
      setRedes(res);
    };
    localStorage.clear();
    console.log("limpie storage");

    fetchData();
  }, []);
  const handleRed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const configSelect = buscarConfiguracion(redes, e.toString());
    if (configSelect) {
      const { w, u, numeroCapas, fa } = configSelect;
      setConfig({ w: w, u: u });
      setCapas(numeroCapas, fa);
    }
    setCongig(buscarConfiguracion(redes, e.toString()));
  };
  const handleConfig = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const res = await handleInputFileSimulacion(
      e,
      setFileSimulacion,
      setDataSimulacion,
      tipoBanco
    );
    setConfig({ w: res.w, u: res.u });
    setCapas(res.numeroCapas, res.fa);
  };
  const pesos = useConfigStorage((state) => state.config.w);
  const umbrales = useConfigStorage((state) => state.config.u);
  const handleBanco = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    // @ts-ignore
    setTypoBanco(e);
  };
  return (
    <div className="flex justify-center flex-col w-full items-center gap-2 p-5  ">
      <ToastContainer stacked transition={Flip}></ToastContainer>

      <h1 className="text-[50px]">
        Aprendizaje <span className="text-[#8E2FE3]">supervisado</span>{" "}
      </h1>
      <div className="flex gap-4  w-[1000px]    ">
        <div className="bg-black bg-opacity-20  entradas w-full rounded-lg p-4 flex flex-col gap-2">
          <Select color="stone" onChange={handleBanco} value={tipoBanco}>
            <SelectItem value="binary" id="1">
              Binario
            </SelectItem>
            <SelectItem value="letras" id="2">
              <option value="">Letras</option>
            </SelectItem>
          </Select>
          <InputFile
            handleInputFile={(e) => handleInputFile(e, setFile, setData,tipoBanco)}
            name={file ? file.name : ""}
          ></InputFile>
          <h2>Parametros de entrada</h2>
          <Parametros
            numEntradas={data.numEntradas}
            numPatrones={data.numPatrones}
            numSalidas={data.numSalidas}
          >
            {" "}
          </Parametros>
        </div>
        <Formulario data={data} funcion={handleConfiguration}></Formulario>
      </div>
      {configuration?.numeroCapas && (
        <VerData
          numeroCapas={configuration!.numeroCapas}
          fa={configuration!.fa}
          salidas={data?.salidas}
          entradas={data.entradas}
          cabeceras={data.cabeceras}
          w={pesos}
          u={umbrales}
          numEntradas={data.numEntradas}
          numSalidas={data.numSalidas}
          numPatrones={data.numPatrones}
        >
          {" "}
        </VerData>
      )}
      <div className="flex flex-col gap-5 bg-black bg-opacity-20  w-[1000px] rounded-lg p-4">
        {" "}
        <h2 className="text-xl font-bold">
          Simulacion <span className="text-[#8E2FE3]">de salidas</span>{" "}
        </h2>
        <div className="flex gap-5">
          <div className="w-full">
            <InputFile
              handleInputFile={(e) => handleConfig(e)}
              name={fileSimulaion ? fileSimulaion.name : ""}
            ></InputFile>
            <div className="flex items-center ">
              <button
                className="text-white bg-gradient-to-r mt-2 from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                onClick={() =>
                  onSimular(
                    dataSimulacion,
                    { w: w, u: u, fa: fa, numeroCapas: numberCapas },
                    setSalidasRed
                  )
                }
              >
                Simular
              </button>
              <Select
                className="mt-2 "
                color="stone"
                value={`${config?._id}`}
                onChange={handleRed}
              >
                {redes.map((red, i) => (
                  <SelectItem key={i} value={`${red._id}`}>
                    Config {i + 1} numero capas: {red.numeroCapas} fa:{" "}
                    {red.fa + ""}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="w-full ">
            {" "}
            {salidaRed.length > 0 && (
              <SimulacionSalidas
                salidaDeseadas={data.salidas}
                salidasRed={salidaRed}
              ></SimulacionSalidas>
            )}
          </div>
        </div>
      </div>
      {salidaRed.length > 0 && data.salidas.length > 0 && (
        <LineChartHero
          datachart={graficarVs(salidaRed, data.salidas)}
        ></LineChartHero>
      )}
      <div className="bg-white h-96 w-96 absolute rounded-full opacity-5   pointer-events-none  -left-4 -top-4 blur-2xl"></div>
      <div className="bg-[#9135E4] pointer-events-none  h-96 w-96 absolute rounded-full opacity-5  top-100 right-2   blur-2xl"></div>
    </div>
  );
};
export default Home;

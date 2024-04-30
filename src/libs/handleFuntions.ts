import { enviarFile, simular } from "../api/axios";
import { FuncionConfig } from "../interfaces/interfaceData";
import { generarValoresAleatorios, TraerPesosYumbrales } from "./funciones";
export const handleChanges = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInputs: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let capas: string[] = [];
  if (+e.target.value < 4 && +e.target.value > 0) {
    for (let i = 0; i < +e.target.value; i++) {
      capas.push(`neuronasCapa${i + 1}`);
    }
  }
  setInputs(capas);
  capas = [];
};
export const funcionFormulario = (
  data: any,
  setInputs: React.Dispatch<React.SetStateAction<string[]>>,
  inputs: string[],
  numEntradas: number,
  numSalidas: number,
  funcion: FuncionConfig
) => {
  console.log(data);
  const capas: string[] = [];
  const winit: any = [];
  const uinit: any = [];
  const fa: any = [];
  for (let i = 0; i < +data.numeroCapas; i++) {
    capas.push(`neuronasCapa${i + 1}`);
  }
  setInputs(capas);
  const generarCapa = (
    neuronasEntrada: number,
    neuronasSalida: number,
    FAcapa: any
  ) => {
    winit.push(generarValoresAleatorios(neuronasEntrada, neuronasSalida));
    uinit.push(generarValoresAleatorios(1, neuronasSalida)[0]);
    fa.push(FAcapa);
  };
  if (data.neuronasCapa1 && data.FAcapa1) {
    generarCapa(numEntradas, data.neuronasCapa1, data.FAcapa1);
  }
  if (data.neuronasCapa2 && data.FAcapa2) {
    generarCapa(data.neuronasCapa1, data.neuronasCapa2, data.FAcapa2);
  }
  if (data.neuronasCapa3 && data.FAcapa3) {
    generarCapa(data.neuronasCapa2, data.neuronasCapa3, data.FAcapa3);
  }
  for (let i = 0; i < inputs.length; i++) {
    if (i === inputs.length - 1) {
      console.log("ultimo", inputs[i]);
      winit.push(generarValoresAleatorios(data[inputs[i]], numSalidas));
      uinit.push(generarValoresAleatorios(1, numSalidas)[0]);
      fa.push(data.FAcapaSalida);
    }
  }
  // localStorage.clear();
  const { w, u } = TraerPesosYumbrales();
  if (w) {
    alert("se cambiaron pesos");
  }
  funcion({
    w: w ? w : winit,
    u: u ? u : uinit,
    fa: fa,
    numeroCapas: +data.numeroCapas,
  });
  return {
    w: w ? w : winit,
    u: u ? u : uinit,
    fa: fa,
    numeroCapas: +data.numeroCapas,
  };
};
export const handleInputFile = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>,
  setData: any
) => {
  const selectedFile = e.target.files && e.target.files[0];

  if (selectedFile) {
    setFile(selectedFile);
    const res = await enviarFile(selectedFile, "file");

    if (res?.data) {
      setData(res.data[0]);
    }
  }
};
export const handleInputFileSimulacion = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setFileSimulacion: React.Dispatch<React.SetStateAction<File | undefined>>,
  setDataSimulacion: any
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
export const onSimular = async (
  dataSimulacion: any,
  config: any,
  setSalidasRed: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  if (dataSimulacion.entradas.length > 0) {
    if (config) {
      const res = await simular({
        w: config.w,
        u: config.u,
        numeroCapas: config.numeroCapas,
        entradas: dataSimulacion.entradas,
        fa: config?.fa,
      });
      setSalidasRed(res);
      if (res) {
        alert("Simulacion realizada");
      }
    }
  }
};
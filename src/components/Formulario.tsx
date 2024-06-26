import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Data, FuncionConfig } from "../interfaces/interfaceData";
import {
  funcionFormulario,
  handleChanges,
  handleChanges2,
} from "../libs/handleFuntions";
import { useConfigStorage } from "../context/store";
import { enviarPesos } from "../api/axios";
import { toast } from "react-toastify";
interface typeForm {
  data: Data;
  funcion: FuncionConfig;
}
function Formulario({ data, funcion }: typeForm) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [inputs, setInputs] = useState<string[]>([]);
  const { numEntradas, numSalidas } = data;
  const setConfig = useConfigStorage((state) => state.setConfig);
  const setAlgortimo = useConfigStorage((state) => state.setAlgoritmo);
  const algortimo = useConfigStorage((state) => state.algortimo);
  const { w } = useConfigStorage((state) => state.config);
  const numberCapas = useConfigStorage((state) => state.numeroCapas);
  const setPesosCargados = useConfigStorage((state) => state.setPesosCargados);
  const setNumeroEntradas = useConfigStorage(
    (state) => state.setNumeroEntradas
  );
  const setCapas = useConfigStorage((state) => state.setCapas);
  const setNumeroCapas = useConfigStorage((state) => state.setNumeroCpas);
  const fa = useConfigStorage((state) => state.fa);
  const pesosCargados = useConfigStorage((state) => state.pesosCargados);
  useEffect(() => {
    handleChanges2(numberCapas, setInputs);
    for (let i = 0; i < numberCapas; i++) {
      // @ts-ignore
      setValue(`neuronasCapa${i + 1}`, w[i][0].length);
      setValue(`FAcapa${i + 1}`, fa[i]);
    }
    setValue("FAcapaSalida", fa[fa.length - 1]);
    setValue("numeroCapas", numberCapas);
  }, [numberCapas]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("aaaaaaaaaaaa", data.numeroCapas);
    setNumeroCapas(data.numeroCapas);

    const { w, u, neuC1, neuC2, neuC3, fa } = funcionFormulario(
      data,
      setInputs,
      inputs,
      numEntradas,
      numSalidas,
      funcion
    );
    console.log("neuuuu", neuC3);
    console.log("FUNTION", fa);

    setCapas(data.numeroCapas, fa);

    setNumeroEntradas(numEntradas, numSalidas, +neuC1, +neuC2, +neuC3);

    if (pesosCargados === false) {
      setConfig({ w: w, u: u });
      toast.dark("W y U generados aleatoreamente");
    }
  };
  const handleInputChanges = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const res = await enviarPesos(selectedFile, "leer/wyu");
      const { w, u, numeroCapas } = res?.data.data;
      if (w) {
        // setCapas(numeroCapas);
        setValue("numeroCapas", numeroCapas);
        setConfig({ w: w, u: u });
        console.log("w", w);

        setPesosCargados();
        toast.success("Pesos y umbrales cargados correctamente 🚀 ", {
          style: {
            background: "#3A3B3C",
            color: "white",
          },
        });
      }
    }
  };
  const algoritmos = ["Backpropagation Primitivo", "Backpropagation Cascada"];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 bg-black justify-between bg-opacity-20 w-full rounded-lg p-4"
    >
      <h2 className="font-bold text-xl">Configuracion de la red </h2>
      <label htmlFor=""> Numero de capas ocultas</label>
      <input
        className="p-2 outline-0 rounded-lg border bg-transparent"
        {...register("numeroCapas")}
        onChange={(e) => handleChanges(e, setInputs)}
        type="number"
        placeholder="Numero de capas"
      />
      {inputs.map((capa, i) => (
        <div key={i} className="flex gap-2 flex-col justify-between">
          <label htmlFor="">{`Capa ${i + 1}`}</label>
          <div className="flex gap-2">
            <input
              {...register(capa, {
                min:
                  i === 0
                    ? {
                        value: numEntradas*2,
                        message: "valor no permitido",
                      }
                    : undefined,
                required: { value: true, message: "campo requerido" },
              })}
              className="p-2 w-full outline-0 rounded-lg border bg-transparent"
              type="number"
              placeholder={`numero de neuronas capa ${i + 1}`}
            />
            {errors.neuronasCapa1 && (
              <span>{errors.root?.message}</span>
            )}
            <select
              className="bg-[#121212] outline-0    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register(`FAcapa${i + 1}`)}
              id=""
            >
              <option className="bg-transparent " value="sigmoide">
                sigmoide
              </option>
              <option className="bg-transparent" value="seno">
                seno
              </option>
              <option className="bg-transparent" value="gaussiana">
                gausiana
              </option>
              <option className="bg-transparent" value="tangente">
                tangente hiperbolica
              </option>
            </select>
          </div>
        </div>
      ))}
      <label htmlFor="">funcion de activacion capa de salidas</label>
      <select
        className="bg-[#121212] outline-0    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(`FAcapaSalida`)}
        id=""
      >
        <option className="bg-transparent " value="sigmoide">
          sigmoide
        </option>
        <option className="bg-transparent" value="seno">
          seno
        </option>
        <option className="bg-transparent" value="gaussiana">
          gausiana
        </option>
        <option className="bg-transparent" value="tangente">
          tangente hiperbolica
        </option>
        <option className="bg-transparent" value="lineal">
          lineal
        </option>
      </select>
      <label htmlFor="">Seleccione el algoritmo de entrenamiento</label>
      <div className="flex gap-2 ">
        {algoritmos.map((algoritmo, i) => (
          <div
            className={`p-2 rounded-lg  border border-[#8E2FE3]  bg-opacity-20 cursor-pointer text-[#8E2FE3] ${
              algortimo === algoritmo
                ? " bg-[#8E2FE3] bg-opacity-20 text-[#8E2FE3]"
                : ""
            }`}
            onClick={() => setAlgortimo(algoritmo)}
            key={i}
          >
            {algoritmo}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {" "}
        <button className="bg-black bg-opacity-40 text-white hover:bg-opacity-60 p-2 rounded-lg">
          Inicializar
        </button>
        <button
          className="bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-lg"
          type="button"
          onClick={() => {
            reset();

            setInputs([]);
          }}
        >
          Limpiar
        </button>
        <div className="flex items-center space-x-6 bg-black rounded-full bg-opacity-20">
          <label className="block border border-transparent">
            <input
              type="file"
              onChange={handleInputChanges}
              className="block w-full text-sm text-white   outline-0
        file:mr-4 file:py-3 file:px-3
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-[#301C42] file:text-violet-700
        hover:file:bg-violet-300
      "
            />
          </label>
        </div>
      </div>
    </form>
  );
}
export default Formulario;

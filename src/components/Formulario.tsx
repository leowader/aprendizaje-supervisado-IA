import { useForm } from "react-hook-form";
import { useState } from "react";
import { Data, FuncionConfig } from "../interfaces/interfaceData";
import { funcionFormulario, handleChanges } from "../libs/handleFuntions";
import { useConfigStorage } from "../context/store";
import { TraerPesosYumbrales } from "../libs/funciones";
interface typeForm {
  data: Data;
  funcion: FuncionConfig;
}
function Formulario({ data, funcion }: typeForm) {
  const { register, handleSubmit } = useForm();
  const [inputs, setInputs] = useState<string[]>([]);
  const [click, setClik] = useState("");
  const { numEntradas, numSalidas } = data;
  const setConfig = useConfigStorage((state) => state.setConfig);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    const { w, u } = funcionFormulario(
      data,
      setInputs,
      inputs,
      numEntradas,
      numSalidas,
      funcion
    );
    setConfig({ w: w, u: u });
  };
  const algoritmos = ["Backpropagation", "Backpropagation Cascada"];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 bg-black bg-opacity-20 w-full rounded-lg p-4"
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
              {...register(capa)}
              className="p-2 w-full outline-0 rounded-lg border bg-transparent"
              type="number"
              placeholder={`numero de neuronas capa ${i + 1}`}
            />
            <select
              className="bg-black bg-opacity-20 outline-0    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="bg-black bg-opacity-20 outline-0    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className={`p-2 rounded-lg bg-[#8E2FE3] bg-opacity-20 cursor-pointer text-[#8E2FE3] ${
              click === algoritmo ? " bg-opacity-40 text-white" : ""
            }`}
            onClick={() => setClik(algoritmo)}
            key={i}
          >
            {algoritmo}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {" "}
        <button className="bg-black w-full bg-opacity-50 text-white p-2 rounded-lg">
          Inicializar
        </button>
        <input
          className=" w-full p-2 text-sm text-white border-none rounded-lg cursor-pointer cus:outline-none bg-black  bg-opacity-50"
          type="file"
        />
      </div>
    </form>
  );
}

export default Formulario;

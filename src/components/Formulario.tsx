import { useForm } from "react-hook-form";

import { useState } from "react";
function Formulario() {
  const { register, handleSubmit } = useForm();
  const [inputs, setInputs] = useState<string[]>([]);
  const [click, setClik] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    const capas: string[] = [];
    for (let i = 0; i < +data.numeroCapas; i++) {
      capas.push(`neuronasCapa${i + 1}`);
    }
    console.log("inputs", inputs);
    setInputs(capas);
  };
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    let capas: string[] = [];
    for (let i = 0; i < +e.target.value; i++) {
      capas.push(`neuronasCapa${i}`);
    }
    setInputs(capas);
    capas = [];
  };
  const algoritmos = ["Correccion de errores", "Backpropagation"];

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
        onChange={handleChanges}
        type="number"
        placeholder="Numero de capas"
      />
      {inputs.map((capa, i) => (
        <div key={i} className="flex gap-2 justify-between">
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
            <option className="bg-transparent" value="gausiana">
              gausiana
            </option>
            <option className="bg-transparent" value="tangente">
              tangente hiperbolica
            </option>
          </select>
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
        <option className="bg-transparent" value="gausiana">
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
      <button className="bg-black bg-opacity-50 text-white p-2 rounded-lg">
        Confirmar
      </button>
    </form>
  );
}

export default Formulario;

import { LineChart } from "@tremor/react";
import { comparationType } from "../interfaces/interfaceData";

const chartdata = [
  {
    date: "yd1",
    SalidaDeseada: 0,
    "salid red": 0,
  },
  {
    date: "yd1",
    SalidaDeseada: 0,
    "salid red": 0,
  },
  {
    date: "yd2",
    SalidaDeseada: 0,
    "salid red": 0,
  },
  {
    date: "yd2",
    SalidaDeseada: 1,
    "salid red": 1,
  },
  {
    date: "yd1",
    SalidaDeseada: 1,
    "salid red": 0,
  },
  {
    date: "yd1",
    SalidaDeseada: 0,
    "salid red": 0,
  },
  {
    date: "yd2",
    SalidaDeseada: 1,
    "salid red": 1,
  },
  {
    date: "yd2",
    SalidaDeseada: 1,
    "salid red": 1,
  },
];

const dataFormatter = (number: number) =>
  `${number.toString()}`;

export function LineChartHero({datachart}:comparationType) {
  console.log("dataaaa",datachart);
  
  return (
    <div className="mt-2 bg-black bg-opacity-20 mb-2 rounded-lg">
      <h2 className=" font-bold text-xl text-center mt-4 ">
        <span className="text-[#8B5CF6]">Salida de la red</span> vs{" "}
        <span className="text-[#1FBB58]">Salida deseada</span>{" "}
      </h2>
      <LineChart
        className="h-80 w-[1000px] rounded-lg p-4 "
        data={datachart}
        index="yd"
        categories={["Salida Red","Salida Deseada"]}
        colors={["indigo","green"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}

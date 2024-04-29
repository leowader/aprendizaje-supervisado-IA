import { AreaChart } from "@tremor/react";
import { FC } from "react";
import { array } from "../interfaces/interfaceData";
const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;
export const AreaChartHero: FC<array> = ({ datachart,funcion }) => {
  return (
    <div className="mt-2 bg-black bg-opacity-20 mb-2 rounded-lg">
      <AreaChart
        className="h-80 w-[1000px]   rounded-lg p-4 "
        data={datachart}
        index="iteracion"
        showAnimation={true}
        categories={["error"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
      <button onClick={funcion} className="p-2 ml-10 bg-black bg-opacity-50 rounded-lg mb-5 hover:bg-opacity-30">Guardar ultimos pesos y umbrales</button>
    </div>
  );
};

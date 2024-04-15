import { AreaChart } from "@tremor/react";
import { FC } from "react";
import { array } from "../interfaces/interfaceData";
const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;
export const AreaChartHero: FC<array> = ({ datachart }) => {
  return (
    <AreaChart
      className="h-80 w-[1000px]  mt-2 bg-black bg-opacity-20  rounded-lg p-4 mb-5"
      data={datachart}
      index="iteracion"
      showAnimation={true}
      categories={["error"]}
      colors={["indigo"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
};

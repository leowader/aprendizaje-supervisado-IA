import { FC } from "react";

interface parametros {
  numEntradas: number;
  children: string;
  numSalidas: number;
  numPatrones: number;
}
export const Parametros: FC<parametros> = ({
  numEntradas,
  numSalidas,
  numPatrones,
}) => {
  return (
    <div className="  w-full flex flex-col gap-y-5">
      {" "}
      <div className="flex gap-2 items-center">
        {" "}
        <div className="w-5 h-5 rounded-full bg-[#8E2FE3] p-2"></div>
        <div>num entradas: {numEntradas}</div>
      </div>
      <div className="flex gap-2 items-center">
        {" "}
        <div className="w-5 h-5 rounded-full bg-[#8E2FE3] p-2"></div>
        <div> salidas: {numSalidas}</div>
      </div>
      <div className="flex gap-2 items-center">
        {" "}
        <div className="w-5 h-5 rounded-full bg-[#8E2FE3] p-2"></div>
        <div>num patrones: {numPatrones} </div>
      </div>
    </div>
  );
};

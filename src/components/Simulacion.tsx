import { FC } from "react";
import { salidas } from "../interfaces/interfaceData";
export const SimulacionSalidas: FC<salidas> = ({
  salidaDeseadas,
  salidasRed,
}) => {
  return (
    <div className="flex gap-5  justify-center  ">
      <div className="flex flex-col items-center  bg-black bg-opacity-20 w-full rounded-lg p-5 ">
        {/* <span>salida deseada : {JSON.stringify(salidaDeseadas)}</span> */}

        <h2 className=" text-xl ">
          salida <span className="text-[#1FBB58]">deseada</span>{" "}
        </h2>
        {salidaDeseadas.map((salida, i) => (
          <div key={i}> {salida}</div>
        ))}
      </div>
      <div className="flex flex-col items-center  bg-black bg-opacity-20 w-full rounded-lg p-5 ">
        {/* <span>salida deseada : {JSON.stringify(salidaDeseadas)}</span> */}

        <h2 className=" text-xl ">
          salida de la <span className="text-[#8E2FE3]">red</span>{" "}
        </h2>
        {salidasRed.map((salida, i) => (
          <div key={i}> {salida}</div>
        ))}
      </div>
    </div>
  );
};

import { FC } from "react";

interface salidas {
  salidasRed: number[][];
  salidaDeseadas: number[][];
}
export const SimulacionSalidas: FC<salidas> = ({
  salidaDeseadas,
  salidasRed,
}) => {
  return (
    <div className="flex gap-x-10 mb-5">
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-5 rounded-lg p-2 ">
        {/* <span>salida deseada : {JSON.stringify(salidaDeseadas)}</span> */}

        <h2 className=" text-xl">
          salida <span className="text-[#1FBB58]">deseada</span>{" "}
        </h2>
        {salidaDeseadas.map((salida, i) => (
          <div key={i}> {salida}</div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center bg-white bg-opacity-5 rounded-lg p-2 ">
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

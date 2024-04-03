import React from "react";
import { HandleInputFileType } from "../interfaces/interfaceData";
interface inputType {
  handleInputFile: HandleInputFileType;
  name: string;
}
export const InputFile: React.FC<inputType> = ({ handleInputFile, name }) => {
  return (
    <div className="flex items-center justify-center w-96">
      <label className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center  ">
          <img
            className="h-24"
            src={
              name
                ? "https://www.thetechedvocate.org/wp-content/uploads/2023/05/xls.png"
                : ""
            }
            alt=""
          />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click para seleccionar</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            CARGAR UN ARCHIVO DE EXCEL (XLS)
          </p>
          <span>{name}</span>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleInputFile}
        />
      </label>
    </div>
  );
};

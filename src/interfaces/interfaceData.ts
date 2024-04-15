export interface Data {
  numEntradas: number;
  children: string;
  numSalidas: number;
  numPatrones: number;
  W: number[][];
  U: number[];
  cabeceras: string[];
  salidas: number[][];
  entradas: number[][];
}
export interface typeChart {
  iteracion: string;
  error: number;
}
export interface array {
  datachart: typeChart[];
}
interface wyuType {
  u: number[];
  w: number[][];
}
export interface typeData{
  errorMaximo:number,
  rata:number,
  iteraciones:number
}
export type HandleParametros = (data: typeData) => void;
export type FuncionParametro = (errores: number[]) => void;
export type HandleInputFileType = (
  e: React.ChangeEvent<HTMLInputElement>
) => Promise<void>;
export type FuncionWyU = () => wyuType;
export type Inputs = {
  numeroCapas: number;
  capa1: number;
  capa2:number
  capa3:number
};
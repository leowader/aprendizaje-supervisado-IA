export interface Data {
  numEntradas: number;
  children: string;
  numSalidas: number;
  numPatrones: number;
  cabeceras: string[];
  salidas: number[][];
  entradas: number[][];
  w: number[][];
  u: number[];
  fa: string[];
  numeroCapas: number;
}
export interface typeChart {
  iteracion: string;
  error: number;
}
export interface array {
  datachart: typeChart[];
  funcion: guardar;
}
interface wyuType {
  u: number[];
  w: number[][];
}
export interface typeData {
  errorMaximo: number;
  rata: number;
  iteraciones: number;
}
export type guardar = () => void;
export type HandleParametros = (data: typeData) => void;
export type FuncionParametro = (errores: number[]) => void;
export type HandleInputFileType = (
  e: React.ChangeEvent<HTMLInputElement>
) => Promise<void>;
export type FuncionWyU = () => wyuType;
export type Inputs = {
  numeroCapas: number;
  capa1: number;
  capa2: number;
  capa3: number;
};
export interface typeConfig {
  w: [];
  u: [];
  fa: [];
  numeroCapas: number;
}
export type FuncionConfig = (data: typeConfig) => void;

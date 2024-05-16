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
export interface salidas {
  salidasRed: number[][];
  salidaDeseadas: number[][];
}
export interface comparation {
  yd: string;
  "Salida Red": number;
  "Salida Deseada": number;
}

export interface comparationType {
  datachart: comparation[];
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
export interface typeConfigZustand {
  fa: [];
  numeroCapas: number;
}
export interface typeConfigRes {
  w: [];
  u: [];
  fa: [];
  _id: string;
  numeroCapas: number;
  banco:string
}
export type FuncionConfig = (data: typeConfigZustand) => void;
export interface TypeDraw {
  entradas: number;
  salidas: number;
  numcapas: number;
  numcapa2?: number;
  numCapas3?: number;
  nuevoConjuntoEntradas?: number; // Nuevo conjunto de entradas opcional
}
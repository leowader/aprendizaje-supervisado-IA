import axios from "axios";
const url = "https://sockets-and-ia.onrender.com";
export const enviarFile = async (file: File, endpoint: string) => {
  try {
    const fileUpdate = new FormData();
    fileUpdate.append("file", file);
    const response = await axios.post(
      `https://sensor-ia-eqnq.onrender.com/${endpoint}`,
      fileUpdate
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const enviarPesos = async (file: File, endpoint: string) => {
  try {
    const fileUpdate = new FormData();
    fileUpdate.append("file", file);
    const response = await axios.post(
      `${url}/${endpoint}`,
      fileUpdate
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getConfigurations = async () => {
  try {
    return (await axios.get(`${url}/configurations`)).data.data;
  } catch (error) {
    console.log("ocurrio un error en la peticon get", error);
  }
};
interface typeSimular{
  entradas: number[][];
  w: number[][];
  u: number[];
  fa: string[];
  numeroCapas: number;
}
export const simular=async (data:typeSimular)=>{
  try {
    return (await axios.post(`${url}/simular`,data)).data.data;
  } catch (error) {
    console.log(error);
    
  }
}

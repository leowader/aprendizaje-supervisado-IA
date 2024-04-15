import axios from "axios";
export const enviarFile = async (file: File,endpoint:string) => {
  try {
    const fileUpdate = new FormData();
    fileUpdate.append("file", file);
    const response = await axios.post(`https://sensor-ia-eqnq.onrender.com/${endpoint}`, fileUpdate);
    return response;
  } catch (error) {
    console.log(error);
  }
};

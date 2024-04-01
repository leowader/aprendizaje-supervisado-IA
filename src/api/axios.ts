import axios from "axios";
export const enviarFile = async (file: File) => {
  try {
    const fileUpdate = new FormData();
    fileUpdate.append("file", file);
    const response = await axios.post("http://127.0.0.1:8000/file", fileUpdate);
    return response;
  } catch (error) {
    console.log(error);
  }
};

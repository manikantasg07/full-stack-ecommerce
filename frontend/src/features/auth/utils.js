import axios from "axios";
const API_URL = process.env.API_URL || "http://localhost:8080";



export const register = async(data)=>{
    console.log("API_URL",API_URL);
    
    const response  =  await axios.post(`${API_URL}/auth/register`,data);
    return response.data;
}
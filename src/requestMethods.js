
import axios from "axios";

// const BASE_URL = "https://api.eassy-online.de/api/";
  //  const BASE_URL = "http://127.0.0.1/api-es/api/";
const BASE_URL = "https://api.eassy.de:8080/api/";


 const publicRequest = axios.create({
  baseURL: BASE_URL
});

export default publicRequest;
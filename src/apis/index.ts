import { enviromentKeys } from "@/constants/enviroment";
import axios from "axios";

export const api = axios.create({
  baseURL: enviromentKeys.API_URL,
  withCredentials: true,
});

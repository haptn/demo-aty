import api from "../config/api"
import { URL_SCHOOLS } from "../config/endpoints"

export const getAllSchools = async () => {
  const res = await api.get(URL_SCHOOLS)
  let data = []
  

}
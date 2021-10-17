import Axios from "axios"

let baseUrl = "http://localhost:5000/api/centers" ;

export const addCenter = async (center) => {
  console.log(center)
  const result = await Axios.post(
    baseUrl + "/add",
    center
  )
  return result.data
}

export const updateCenter = async (center) => {
  const result = await Axios.put(
    baseUrl + "/update" ,
    center
  )
  return result.data.updatedCenter
}

export const deleteCenter = async (name) => {
  const result = await Axios.delete(
    baseUrl + "/delete/" + name
  )
  return result.data
}

export const fetchCenterByName = async (name) => {
  const result = await Axios.get(
    baseUrl + "/name/" + name
  )
  return result.data.center
}

export const fetchCenters = async () => {
  // await delay(500)
  const result = await Axios.get(
    baseUrl + "/all"
  ) 
  return result.data.centers
}

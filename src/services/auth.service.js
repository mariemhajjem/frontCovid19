import Axios from "axios"

let baseUrl = "http://localhost:5000/api/auth" ;

export const register = async (user) => {
  try {
    const result = await Axios.post(
      baseUrl + "/register",
      user
    )
    localStorage.setItem("token" , result );
    return result;

  } catch (error) {
    return false;
  }
} 

export const login = async (user) => {
  try {
    const result = await Axios.put(
      baseUrl + "/login" ,
      user
    )
    localStorage.setItem("token" , result );
    return result.data.user
  } catch (error) {
    return false;
  }
}
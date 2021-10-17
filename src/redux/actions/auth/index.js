import * as types from "../../types"
import * as api from "../../../services/auth.service"

export const login = (cin, password) => async (dispatch) => {
  const loggedUser ={
    cin,
    password
   }
  try {
      const user = await api.login(loggedUser) 
      dispatch({
          type: types.LOGIN_SUCCESS,
          payload: user,
      });
  } catch (e) {
            dispatch({
            type: types.LOGIN_FAIL,
            payload: {},
                });
  }
 
};
/*
export const register = (values) => (dispatch) => {

  return registerFromAPI(values).then(
      (result) => {

          if (result.error === false) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              /*localStorage.setItem('user', JSON.stringify(result.data));
               dispatch({
                   type: REGISTER_SUCCESS,
                   payload: result.data,
               });
               
              
              return true

          } else {
              dispatch({
                  type: REGISTER_FAIL,
                  payload: {},
              });
              return result.data

          }
      }

  );
*/

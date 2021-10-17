import * as types from "../types"

let user = JSON.parse(localStorage.getItem('token'));

const initialState = user ? { loggedIn: true, user } : {};

const auth = (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload
      };
    case LOGIN_FAIL:
      return {};


    default:
      return state 
    }
}


export default auth;
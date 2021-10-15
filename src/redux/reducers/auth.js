import * as types from "../types"

const initialState = {
  user: {},
  loading: false,
  errors: false, 
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER:
          return {
            ...state,
            user: action.id,
          }
        case types.FETCH_USER_REQUEST:
            return { ...state, loading: true, error: true }
        case types.FETCH_USER_SUCCESS:
            return { ...state, user: [...action.user], loading: false }
        case types.FETCH_USER_FAILURE:
            return { ...state, error: true, loading: false } 
        default :
            return state
    }
}
export default auth;
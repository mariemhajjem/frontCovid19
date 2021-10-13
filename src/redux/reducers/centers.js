import * as types from "../types"

const initialState = {
  selectedCenter: {},
  loading: false,
  errors: false,
  list: [],
}

const centers = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_CENTER:
      return {
        ...state,
        selectedCenter: state.list.find((center) => center.id === action.id) || {},
      }
    case types.FETCH_CENTERS_REQUEST:
      return { ...state, loading: true, error: true }
    case types.FETCH_CENTERS_SUCCESS:
      return { ...state, list: [...action.centers], loading: false }
    case types.FETCH_CENTERS_FAILURE:
      return { ...state, error: true, loading: false }
    case types.FETCH_CENTER_BY_ID:
      return {
        ...state,
        selectedCenter: action.center,
      }

    case types.ADD_CENTER:
      console.log(action)
      // ne pas faire state.list=[...state.list, {id: ""+(state.list.length+1), ...action.center}]
      // ou
      // state.list.push(
      //   { id: "" + (state.list.length + 1), ...action.center },
      // )
      // return state
      return {
        ...state,
        list: [...state.list, action.center], // or list: state.list.concat(action.center)
      }

    case types.UPDATE_CENTER:
      const updatedCenters = state.list.map((center) => {
        if (center.id === action.id) {
          return action.center
        }
        return center
      })
      return { ...state, list: updatedCenters }

    case types.DELETE_CENTER:
      const newCenters = state.list.filter((center) => center.id !== action.id)
      return { ...state, list: newCenters }
    default:
      return state
  }
}
export default centers

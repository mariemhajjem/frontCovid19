import * as types from "../../types"
import * as api from "../../../services/auth.service"

export const setSelectedCenter = (id) => ({
  type: types.SET_SELECTED_CENTER,
  id
})

export const fetchCenters = () => async (dispatch) => {
   dispatch({
     type: types.FETCH_CENTERS_REQUEST,
     
   })
      try {
        const centers = await api.fetchCenters()
         dispatch({
           type: types.FETCH_CENTERS_SUCCESS,
           centers,
         })
      } catch (e) {
       dispatch({
         type: types.FETCH_CENTERS_FAILURE,
       })
      }
}

export const fetchCenterByName = (id) => async (dispatch) => {
  const center = await api.fetchCenterByName(id)
  dispatch ( {
    type: types.FETCH_CENTER_BY_ID,
    center,
  })
}

export const addCenter = (center) => async (dispatch) => {
  const newCenter = await api.addCenter(center)

  dispatch({
    type: types.ADD_CENTER,
    center: newCenter,
  })
}

export const updateCenter = ( center) => async (dispatch) => {
  const updatedCenter = await api.updateCenter( center)

  dispatch ( {
    type: types.UPDATE_CENTER,
    center: updatedCenter,
  })
}
export const deleteCenter = (name) => async (dispatch) => {
  await api.deleteCenter(name)
  dispatch ( {
    type: types.DELETE_CENTER,
  })
}
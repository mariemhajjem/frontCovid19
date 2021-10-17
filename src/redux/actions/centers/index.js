import * as types from "../../types"
import * as api from "../../../services/centers.service"
export const setSelectedCenter = (center) => ({
  type: types.SET_SELECTED_CENTER,
  center
})

export const setDisplayed = (value) => ({
  type: types.SET_DISPLAYED,
  value
})

export const setDisplayUpdate = (value) => ({
  type: types.SET_DISPLAY_UPDATE,
  value
})

export const fetchCenters = () => async (dispatch) => {
   dispatch({
     type: types.FETCH_CENTERS_REQUEST,
     
   })
   
      try {
        // const centers =  

         dispatch({
           type: types.FETCH_CENTERS_SUCCESS,
           list: await api.fetchCenters(),
         })
        // console.log(centers)
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
  console.log(newCenter)
  newCenter? 
  dispatch({
    type: types.ADD_CENTER,
    center: newCenter,
  }) : console.log("Error ")
}

export const updateCenter = (center) => async (dispatch) => {
  try{
  const updatedCenter = await api.updateCenter(center) 
  dispatch ( {
    type: types.UPDATE_CENTER,
    center: updatedCenter,
  })
  }catch(e){
    console.log(e)
  }
  
}
export const deleteCenter = (name) => async (dispatch) => {
  await api.deleteCenter(name)
  dispatch ( {
    type: types.DELETE_CENTER,
    center: name
  })
}




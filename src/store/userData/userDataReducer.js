import { GET_USER_DATA } from "./userDataType"

const initialState = {
  userData: [],
}

export default function getUserData(state = initialState, action) {
  if (action.type === GET_USER_DATA) {
    return { ...state, userData: action.data }
  }
  return state
}

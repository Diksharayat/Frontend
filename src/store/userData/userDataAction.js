import { GET_USER_DATA } from "./userDataType"

 const getUserData = data => {
  return {
    type: GET_USER_DATA,
    data : data
  }
}
export default getUserData

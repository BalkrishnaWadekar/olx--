import axios from 'axios'
import { CLOSE_TOAST, DELETE_SIGNLE_USER_FAIL, DELETE_SIGNLE_USER_REQUEST, DELETE_SIGNLE_USER_SUCCESS, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constant/userConstants"
export const signupUserAction = userData => async dispatch => {
    console.log(userData);
    try {
        dispatch({ type: USER_SIGNUP_REQUEST })
        const { data } = await axios.post("http://localhost:5000/api/user/signup", userData)
        dispatch({ type: USER_SIGNUP_SUCCESS })
        console.log(data);
    } catch (error) {
        dispatch({ type: USER_SIGNUP_FAIL, payload: error })
    }
}
export const closeToast = () => async dispatch => {
    dispatch({ type: CLOSE_TOAST })
}




export const signinUserAction = credential => async dispatch => {
    console.log(credential);
    try {
        dispatch({ type: USER_SIGNIN_REQUEST })
        const { data: { result } } = await axios.post("http://localhost:5000/api/auth/login", credential)
        console.log(result);
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: result })
        localStorage.setItem("signInData", JSON.stringify(result))
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error })
    }
}

export const getAllUsersAction = () => async dispatch => {
    try {
        dispatch({ type: GET_ALL_USERS_REQUEST })
        const { data: { result } } = await axios.get("http://localhost:5000/api/user/getallusers")
        console.log(result);
        dispatch({ type: GET_ALL_USERS_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: GET_ALL_USERS_FAIL, payload: error })
    }
}

export const deleteSingleUserAction = userId => async dispatch => {
    try {
        dispatch({ type: DELETE_SIGNLE_USER_REQUEST })
        const { data: { result } } = await axios.delete(`http://localhost:5000/api/user/delete/${userId}`)
        console.log(result);
        dispatch({ type: DELETE_SIGNLE_USER_SUCCESS })
    } catch (error) {
        dispatch({ type: DELETE_SIGNLE_USER_FAIL, payload: error })
    }
}

export const userLogOutAction = () => async dispatch => {
    localStorage.removeItem("signInData")
    dispatch({ type: USER_LOGOUT })
}

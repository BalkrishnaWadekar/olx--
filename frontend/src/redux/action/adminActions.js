import axios from "axios"
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "../constant/adminConstants"

export const adminLoginAction = loginInput => async dispatch => {
    try {
        console.log(loginInput);
        dispatch({ type: ADMIN_LOGIN_REQUEST })

        const { data: { result } } = await axios.post("http://localhost:5000/api/admin/login", loginInput)
        localStorage.setItem("adminLoginData", JSON.stringify(result))
        dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: ADMIN_LOGIN_FAIL, payload: error })
    }
}

export const adminLogOutAction = () => async dispatch => {
    localStorage.removeItem("adminLoginData")
    dispatch({ type: ADMIN_LOGOUT })
}

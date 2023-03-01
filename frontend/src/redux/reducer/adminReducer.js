import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "../constant/adminConstants"

export const adminReducer = (state = { adminLoginData: {} }, { type, payload }) => {
    switch (type) {

        case ADMIN_LOGIN_REQUEST: return { ...state, loading: true }
        case ADMIN_LOGIN_SUCCESS: return { ...state, loading: false, adminLoginData: payload }
        case ADMIN_LOGIN_FAIL: return { ...state, loading: false, error: payload }

        case ADMIN_LOGOUT: return { loading: false }

        default: return state

    }
}

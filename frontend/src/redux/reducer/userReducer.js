const { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAIL, DELETE_SIGNLE_USER_REQUEST, DELETE_SIGNLE_USER_SUCCESS, DELETE_SIGNLE_USER_FAIL, CLOSE_TOAST } = require("../constant/userConstants")

export const userSignupReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case USER_SIGNUP_REQUEST: return { loading: true, signup: false }
        case USER_SIGNUP_SUCCESS: return { loading: false, signup: true }
        case USER_SIGNUP_FAIL: return { loading: false, error: payload, signup: true }
        case CLOSE_TOAST: return { signup: false }
        default: return state
    }
}

export const userLoginReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case USER_SIGNIN_REQUEST: return { loading: true }
        case USER_SIGNIN_SUCCESS: return { loading: false, signin: payload }
        case USER_SIGNIN_FAIL: return { loading: false, error: payload }
        case USER_LOGOUT: return {}
        default: return state
    }
}


export const userReducer = (state = { allUsers: [] }, { type, payload }) => {
    switch (type) {
        case GET_ALL_USERS_REQUEST: return { loading: true }
        case GET_ALL_USERS_SUCCESS: return { loading: false, allUsers: payload }
        case GET_ALL_USERS_FAIL: return { loading: false, error: payload }

        case DELETE_SIGNLE_USER_REQUEST: return { loading: true, userDeleted: false }
        case DELETE_SIGNLE_USER_SUCCESS: return { loading: false, userDeleted: true }
        case DELETE_SIGNLE_USER_FAIL: return { loading: false, error: payload, userDeleted: false }

        default: return state
    }
}
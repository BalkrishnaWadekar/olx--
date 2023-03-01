import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { adminReducer } from "./reducer/adminReducer"
import { productReducer } from "./reducer/productReducer"
import { userLoginReducer, userReducer, userSignupReducer } from "./reducer/userReducer"

const rootreducer = combineReducers({
    userSignUp: userSignupReducer,
    userSignIn: userLoginReducer,
    user: userReducer,
    products: productReducer,
    adminSignIn: adminReducer
})

const userlocalStorageData = localStorage.getItem("signInData")
    ? JSON.parse(localStorage.getItem("signInData"))
    : null

const adminlocalStorageData = localStorage.getItem("adminLoginData")
    ? JSON.parse(localStorage.getItem("adminLoginData"))
    : null

const productDetaillocalStData = localStorage.getItem("productDetail")
    ? JSON.parse(localStorage.getItem("productDetail"))
    : null

const intialValue = {
    userSignIn: {
        signin: userlocalStorageData
    },
    adminSignIn: {
        adminLoginData: adminlocalStorageData
    },
    // products: {
    //     productInfo: productDetaillocalStData
    // }
}

const store = createStore(
    rootreducer,
    intialValue,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
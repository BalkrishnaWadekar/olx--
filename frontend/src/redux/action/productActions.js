import axios from "axios";
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADMIN_PRODUCT_CONTROL_METHOD_FAIL, ADMIN_PRODUCT_CONTROL_METHOD_REQUEST, ADMIN_PRODUCT_CONTROL_METHOD_SUCCESS, CART_REMOVE_ORDERED_ITEMS_FAIL, CART_REMOVE_ORDERED_ITEMS_REQUEST, CART_REMOVE_ORDERED_ITEMS_SUCCESS, DELETE_USER_PRODUCT_FAIL, DELETE_USER_PRODUCT_REQUEST, DELETE_USER_PRODUCT_SUCCESS, DESTROY_USER_PRODUCTS_FAIL, DESTROY_USER_PRODUCTS_REQUEST, DESTROY_USER_PRODUCTS_SUCCESS, EDIT_REJ_PRODUCT_FAIL, EDIT_REJ_PRODUCT_REQUEST, EDIT_REJ_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAIL, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS, GET_ALL_REJECTED_PRODUCTS_FAIL, GET_ALL_REJECTED_PRODUCTS_REQUEST, GET_ALL_REJECTED_PRODUCTS_SUCCESS, GET_ALL_VERIFIED_PRODUCTS_FAIL, GET_ALL_VERIFIED_PRODUCTS_REQUEST, GET_ALL_VERIFIED_PRODUCTS_SUCCESS, GET_CART_ITEMS_FAIL, GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS, GET_DATA_PRODUCT_VERIFICATION_FAIL, GET_DATA_PRODUCT_VERIFICATION_REQUEST, GET_DATA_PRODUCT_VERIFICATION_SUCCESS, GET_PRODUCTS_USEWISE_FAIL, GET_PRODUCTS_USEWISE_REQUEST, GET_PRODUCTS_USEWISE_SUCCESS, GET_RECEIVED_ORDERS_FAIL, GET_RECEIVED_ORDERS_REQUEST, GET_RECEIVED_ORDERS_SUCCESS, GET_REJECTED_PRODUCTS_OF_USER_FAIL, GET_REJECTED_PRODUCTS_OF_USER_REQUEST, GET_REJECTED_PRODUCTS_OF_USER_SUCCESS, GET_USER_ORDERED_ITEMS_FAIL, GET_USER_ORDERED_ITEMS_REQUEST, GET_USER_ORDERED_ITEMS_SUCCESS, GET_USER_PRODUCTS_FAIL, GET_USER_PRODUCTS_REQUEST, GET_USER_PRODUCTS_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, REMOVE_CART_ITEMS_FAIL, REMOVE_CART_ITEMS_REQUEST, REMOVE_CART_ITEMS_SUCCESS } from "../constant/productConstants";

export const getAllProductAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_PRODUCT_REQUEST })

        const { data: { result } } = await axios.get("http://localhost:5000/api/product/getall")
        console.log("allproducts : " + result);

        dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCT_FAIL, payload: error })
    }
}


export const addProductAction = productData => async (dispatch, getState) => {
    try {
        console.log(productData);
        dispatch({ type: ADD_PRODUCT_REQUEST })
        const { userSignIn: { signin: { token } } } = getState()
        console.log(token);
        const config = {
            headers: {
                authorization: token
            }
        }
        console.log(getState());
        const { data: { result } } = await axios.post("http://localhost:5000/api/product/add", productData, config)
        console.log(result);
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: result })
    } catch (error) {
        dispatch({ type: ADD_PRODUCT_FAIL, payload: error })
    }
}


export const getDataToProductVerification = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_DATA_PRODUCT_VERIFICATION_REQUEST })

        const { data: { result } } = await axios.get("http://localhost:5000/api/product/gettoverify")
        console.log("verifyProducts : " + result);

        dispatch({ type: GET_DATA_PRODUCT_VERIFICATION_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_DATA_PRODUCT_VERIFICATION_FAIL, payload: error })
    }
}

export const adminProductControll = (Id, method) => async (dispatch, getState) => {
    try {
        console.log(method);
        dispatch({ type: ADMIN_PRODUCT_CONTROL_METHOD_REQUEST })

        const { data: { result } } = await axios.put(`http://localhost:5000/api/product/admincontrols/${Id}`, { method })
        console.log("verifyProducts : " + result);

        dispatch({ type: ADMIN_PRODUCT_CONTROL_METHOD_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: ADMIN_PRODUCT_CONTROL_METHOD_FAIL, payload: error })
    }
}

export const getAllRejectedProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_REJECTED_PRODUCTS_REQUEST })

        const { data: { result } } = await axios.get("http://localhost:5000/api/product/all/rejected")
        console.log("allRejectedProducts : " + result);

        dispatch({ type: GET_ALL_REJECTED_PRODUCTS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_ALL_REJECTED_PRODUCTS_FAIL, payload: error })
    }
}

export const getAllVerifiedProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_VERIFIED_PRODUCTS_REQUEST })

        const { data: { result } } = await axios.get("http://localhost:5000/api/product/all/verified")
        console.log("allVerifiedProducts : " + result);

        dispatch({ type: GET_ALL_VERIFIED_PRODUCTS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_ALL_VERIFIED_PRODUCTS_FAIL, payload: error })
    }
}


export const getRejectedProductsUserwise = userId => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_REJECTED_PRODUCTS_OF_USER_REQUEST })

        const { data: { result } } = await axios.get(`http://localhost:5000/api/product/rejected/userwise/${userId}`)
        console.log("getRejectedProductsUserwise : ", result);

        dispatch({ type: GET_REJECTED_PRODUCTS_OF_USER_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_REJECTED_PRODUCTS_OF_USER_FAIL, payload: error })
    }
}


export const AddToCartAction = cartData => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST })

        const { data: { result } } = await axios.post("http://localhost:5000/api/cart/additem", cartData)

        console.log("cardAddedItems : ", result);

        dispatch({ type: ADD_TO_CART_SUCCESS })

    } catch (error) {
        dispatch({ type: ADD_TO_CART_FAIL, payload: error })
    }
}

export const getCartItemsAction = userId => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_CART_ITEMS_REQUEST })

        const { data: { result } } = await axios.get(`http://localhost:5000/api/cart/getcartitems/${userId}`)

        console.log("getCartItems : ", result);

        dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_CART_ITEMS_FAIL, payload: error })
    }
}

export const removeFromCart = productId => async (dispatch, getState) => {
    try {
        console.log(productId);
        dispatch({ type: REMOVE_CART_ITEMS_REQUEST })
        const { data: { result } } = await axios.get(`http://localhost:5000/api/cart/removecartitems/${productId}`)

        console.log("getCartItems : ", result);

        dispatch({ type: REMOVE_CART_ITEMS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: REMOVE_CART_ITEMS_FAIL, payload: error })
    }
}


export const placeOrderAction = orderData => async (dispatch, getState) => {
    try {
        console.log(orderData);
        dispatch({ type: PLACE_ORDER_REQUEST })
        const { data } = await axios.post("http://localhost:5000/api/orders/placeorder", orderData)
        console.log(data);
        // console.log("orderPaced Items : ", result);

        dispatch({ type: PLACE_ORDER_SUCCESS })

    } catch (error) {
        dispatch({ type: PLACE_ORDER_FAIL, payload: error })
    }
}


export const cartDataRAO = dataRAO => async (dispatch, getState) => {
    try {
        console.log(dataRAO);
        dispatch({ type: CART_REMOVE_ORDERED_ITEMS_REQUEST })
        const { data } = await axios.post("http://localhost:5000/api/cart/remove/ordered", dataRAO)
        console.log(data);
        // console.log("orderPaced Items : ", result);

        dispatch({ type: CART_REMOVE_ORDERED_ITEMS_SUCCESS })

    } catch (error) {
        dispatch({ type: CART_REMOVE_ORDERED_ITEMS_FAIL, payload: error })
    }
}


export const userOrderedItems = (userId, method) => async (dispatch) => {
    try {
        // console.log(dataRAO);
        dispatch({ type: GET_USER_ORDERED_ITEMS_REQUEST })
        const { data: { result } } = await axios.get(`http://localhost:5000/api/orders/get/ofuser/${userId}`, method)
        console.log(result);
        dispatch({ type: GET_USER_ORDERED_ITEMS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_USER_ORDERED_ITEMS_FAIL, payload: error })
    }
}


export const receivedOrdersActions = (userId, method) => async (dispatch) => {
    try {
        // console.log(dataRAO);
        dispatch({ type: GET_RECEIVED_ORDERS_REQUEST })
        const { data: { result } } = await axios.get(`http://localhost:5000/api/orders/received/${userId}`, method)
        console.log(result);
        dispatch({ type: GET_RECEIVED_ORDERS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_RECEIVED_ORDERS_FAIL, payload: error })
    }
}


export const editRejectedProduct = (productId, data) => async (dispatch) => {
    try {
        // console.log(dataRAO);
        dispatch({ type: EDIT_REJ_PRODUCT_REQUEST })
        const { data: { result } } = await axios.put(`http://localhost:5000/api/product/edit/rejected/${productId}`, data)
        console.log(result);
        dispatch({ type: EDIT_REJ_PRODUCT_SUCCESS })

    } catch (error) {
        dispatch({ type: EDIT_REJ_PRODUCT_FAIL, payload: error })
    }
}

export const getUserProducts = userId => async (dispatch) => {
    try {
        // console.log(dataRAO);
        dispatch({ type: GET_USER_PRODUCTS_REQUEST })
        const { data: { result } } = await axios.get(`http://localhost:5000/api/product/user/${userId}`)
        console.log(result);
        dispatch({ type: GET_USER_PRODUCTS_SUCCESS, payload: result })

    } catch (error) {
        dispatch({ type: GET_USER_PRODUCTS_FAIL, payload: error })
    }
}


export const productDetailAction = productData => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: productData })
        localStorage.setItem("productDetail", JSON.stringify(productData))
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error })
    }
}


export const deleteUserProduct = productId => async (dispatch) => {
    try {
        // console.log(dataRAO);
        dispatch({ type: DELETE_USER_PRODUCT_REQUEST })
        const { data: { result } } = await axios.delete(`http://localhost:5000/api/product/delete/${productId}`)
        console.log(result);
        dispatch({ type: DELETE_USER_PRODUCT_SUCCESS })

    } catch (error) {
        dispatch({ type: DELETE_USER_PRODUCT_FAIL, payload: error })
    }
}

export const destroyUserProducts = productId => async (dispatch) => {
    try {
        // console.log(dataRAO);
        dispatch({ type: DESTROY_USER_PRODUCTS_REQUEST })
        const { data: { result } } = await axios.delete(`http://localhost:5000/api/product/userwise/destroy/${productId}`)
        console.log(result);
        dispatch({ type: DESTROY_USER_PRODUCTS_SUCCESS })

    } catch (error) {
        dispatch({ type: DESTROY_USER_PRODUCTS_FAIL, payload: error })
    }
}

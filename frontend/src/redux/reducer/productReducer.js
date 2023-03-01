import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADMIN_PRODUCT_CONTROL_METHOD_FAIL, ADMIN_PRODUCT_CONTROL_METHOD_REQUEST, ADMIN_PRODUCT_CONTROL_METHOD_SUCCESS, CART_REMOVE_ORDERED_ITEMS_FAIL, CART_REMOVE_ORDERED_ITEMS_REQUEST, CART_REMOVE_ORDERED_ITEMS_SUCCESS, DELETE_PRODUCTS_USERWISE_FAIL, DELETE_PRODUCTS_USERWISE_REQUEST, DELETE_PRODUCTS_USERWISE_SUCCESS, DELETE_USER_PRODUCT_FAIL, DELETE_USER_PRODUCT_REQUEST, DELETE_USER_PRODUCT_SUCCESS, DESTROY_USER_PRODUCTS_FAIL, DESTROY_USER_PRODUCTS_REQUEST, DESTROY_USER_PRODUCTS_SUCCESS, EDIT_REJ_PRODUCT_FAIL, EDIT_REJ_PRODUCT_REQUEST, EDIT_REJ_PRODUCT_SUCCESS, GET_ALL_PRODUCT_FAIL, GET_ALL_PRODUCT_REQUEST, GET_ALL_PRODUCT_SUCCESS, GET_ALL_REJECTED_PRODUCTS_FAIL, GET_ALL_REJECTED_PRODUCTS_REQUEST, GET_ALL_REJECTED_PRODUCTS_SUCCESS, GET_ALL_VERIFIED_PRODUCTS_FAIL, GET_ALL_VERIFIED_PRODUCTS_REQUEST, GET_ALL_VERIFIED_PRODUCTS_SUCCESS, GET_CART_ITEMS_FAIL, GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS, GET_DATA_PRODUCT_VERIFICATION_FAIL, GET_DATA_PRODUCT_VERIFICATION_REQUEST, GET_DATA_PRODUCT_VERIFICATION_SUCCESS, GET_PRODUCTS_USEWISE_FAIL, GET_PRODUCTS_USEWISE_REQUEST, GET_PRODUCTS_USEWISE_SUCCESS, GET_RECEIVED_ORDERS_FAIL, GET_RECEIVED_ORDERS_REQUEST, GET_RECEIVED_ORDERS_SUCCESS, GET_REJECTED_PRODUCTS_OF_USER_FAIL, GET_REJECTED_PRODUCTS_OF_USER_REQUEST, GET_REJECTED_PRODUCTS_OF_USER_SUCCESS, GET_USER_ORDERED_ITEMS_FAIL, GET_USER_ORDERED_ITEMS_REQUEST, GET_USER_ORDERED_ITEMS_SUCCESS, GET_USER_PRODUCTS_FAIL, GET_USER_PRODUCTS_REQUEST, GET_USER_PRODUCTS_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, REMOVE_CART_ITEMS_FAIL, REMOVE_CART_ITEMS_REQUEST, REMOVE_CART_ITEMS_SUCCESS } from "../constant/productConstants"

export const productReducer = (state = { allProducts: [], cartItems: [], removedFromCart: false, orderedItems: [], receivedOrders: [], userProducts: [], productInfo: {} }, { type, payload }) => {
    switch (type) {

        case ADD_PRODUCT_REQUEST: return { ...state, loading: true }
        case ADD_PRODUCT_SUCCESS: return { ...state, loading: false, addedProduct: payload }
        case ADD_PRODUCT_FAIL: return { ...state, loading: false, error: payload }


        case GET_ALL_PRODUCT_REQUEST: return { ...state, loading: true }
        case GET_ALL_PRODUCT_SUCCESS: return { ...state, loading: false, allProducts: payload }
        case GET_ALL_PRODUCT_FAIL: return { ...state, loading: false, error: payload }


        case GET_DATA_PRODUCT_VERIFICATION_REQUEST: return { ...state, loading: true }
        case GET_DATA_PRODUCT_VERIFICATION_SUCCESS: return { ...state, loading: false, verifyProducts: payload }
        case GET_DATA_PRODUCT_VERIFICATION_FAIL: return { ...state, loading: false, error: payload }


        case ADMIN_PRODUCT_CONTROL_METHOD_REQUEST: return { ...state, loading: true }
        case ADMIN_PRODUCT_CONTROL_METHOD_SUCCESS: return { ...state, loading: false, adminProductControlled: payload }
        case ADMIN_PRODUCT_CONTROL_METHOD_FAIL: return { ...state, loading: false, error: payload }


        case GET_ALL_REJECTED_PRODUCTS_REQUEST: return { ...state, loading: true }
        case GET_ALL_REJECTED_PRODUCTS_SUCCESS: return { ...state, loading: false, allRejectedProducts: payload }
        case GET_ALL_REJECTED_PRODUCTS_FAIL: return { ...state, loading: false, error: payload }


        case GET_ALL_VERIFIED_PRODUCTS_REQUEST: return { ...state, loading: true }
        case GET_ALL_VERIFIED_PRODUCTS_SUCCESS: return { ...state, loading: false, allVerifiedProducts: payload }
        case GET_ALL_VERIFIED_PRODUCTS_FAIL: return { ...state, loading: false, error: payload }


        case ADD_TO_CART_REQUEST: return { ...state, loading: true }
        case ADD_TO_CART_SUCCESS: return { ...state, loading: false, productAdded: true, removedFromCart: true }
        case ADD_TO_CART_FAIL: return { ...state, loading: false, productAdded: false, error: payload }


        case GET_CART_ITEMS_REQUEST: return { ...state, loading: true }
        case GET_CART_ITEMS_SUCCESS: return { ...state, loading: false, cartItems: payload, removedFromCart: false }
        case GET_CART_ITEMS_FAIL: return { ...state, loading: false, error: payload }


        case REMOVE_CART_ITEMS_REQUEST: return { ...state, loading: true }
        case REMOVE_CART_ITEMS_SUCCESS: return { ...state, loading: false, removedFromCart: true }
        case REMOVE_CART_ITEMS_FAIL: return { ...state, loading: false, removedFromCart: false, error: payload }


        case PLACE_ORDER_REQUEST: return { ...state, loading: true, orderPlaced: false }
        case PLACE_ORDER_SUCCESS: return { ...state, loading: false, orderPlaced: true }
        case PLACE_ORDER_FAIL: return { ...state, loading: false, error: payload, orderPlaced: false }


        case CART_REMOVE_ORDERED_ITEMS_REQUEST: return { ...state, loading: true, cartRAO: false }
        case CART_REMOVE_ORDERED_ITEMS_SUCCESS: return { ...state, loading: false, cartRAO: true }
        case CART_REMOVE_ORDERED_ITEMS_FAIL: return { ...state, loading: false, error: payload }


        case GET_USER_ORDERED_ITEMS_REQUEST: return { ...state, loading: true, getOrderedItems: false }
        case GET_USER_ORDERED_ITEMS_SUCCESS: return { ...state, loading: false, orderedItems: payload, getOrderedItems: true }
        case GET_USER_ORDERED_ITEMS_FAIL: return { ...state, loading: false, error: payload }


        case GET_RECEIVED_ORDERS_REQUEST: return { ...state, loading: true, getReceivedOrders: false }
        case GET_RECEIVED_ORDERS_SUCCESS: return { ...state, loading: false, receivedOrders: payload, getReceivedOrders: true }
        case GET_RECEIVED_ORDERS_FAIL: return { ...state, loading: false, error: payload }


        case EDIT_REJ_PRODUCT_REQUEST: return { ...state, loading: true, editRejProduct: false }
        case EDIT_REJ_PRODUCT_SUCCESS: return { ...state, loading: false, editRejProduct: true }
        case EDIT_REJ_PRODUCT_FAIL: return { ...state, loading: false, error: payload }


        case DELETE_USER_PRODUCT_REQUEST: return { ...state, loading: true, deleteProduct: false }
        case DELETE_USER_PRODUCT_SUCCESS: return { ...state, loading: false, deleteProduct: true }
        case DELETE_USER_PRODUCT_FAIL: return { ...state, loading: false, error: payload }


        case DELETE_USER_PRODUCT_REQUEST: return { ...state, loading: true, deleteProduct: false }
        case DELETE_USER_PRODUCT_SUCCESS: return { ...state, loading: false, deleteProduct: true }
        case DELETE_USER_PRODUCT_FAIL: return { ...state, loading: false, error: payload }


        case GET_USER_PRODUCTS_REQUEST: return { ...state, loading: true }
        case GET_USER_PRODUCTS_SUCCESS: return { ...state, loading: false, userProducts: payload }
        case GET_USER_PRODUCTS_FAIL: return { ...state, loading: false, error: payload }


        case PRODUCT_DETAILS_REQUEST: return { ...state, loading: true }
        case PRODUCT_DETAILS_SUCCESS: return { ...state, loading: false, productInfo: payload }
        case PRODUCT_DETAILS_FAIL: return { ...state, loading: false, error: payload }


        case DESTROY_USER_PRODUCTS_REQUEST: return { ...state, loading: true, destroyUserProducts: false }
        case DESTROY_USER_PRODUCTS_SUCCESS: return { ...state, loading: false, destroyUserProducts: true }
        case DESTROY_USER_PRODUCTS_FAIL: return { ...state, loading: false, error: payload }


        default: return state
    }
}

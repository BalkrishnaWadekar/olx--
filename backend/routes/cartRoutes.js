const express = require("express")
const { addToCart, getUserCartItems, removeUserCartItems, removeOrderedCartItems, destroyCart } = require("../controllers/cartController")

const router = express.Router()

//http://localhost:5000/api/cart/additem
router
    .route("/additem").post(addToCart)

//http://localhost:5000/api/cart/getcartitems
router
    .route("/getcartitems/:id").get(getUserCartItems)

//http://localhost:5000/api/cart/removecartitems
router
    .route("/removecartitems/:id").get(removeUserCartItems)

//http://localhost:5000/api/cart/remove/ordered
router
    .route("/remove/ordered").post(removeOrderedCartItems)

//http://localhost:5000/api/cart/destroy
router
    .route("/destroy").delete(destroyCart)
module.exports = router
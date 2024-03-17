const express = require("express")
const { addToCart, getUserCartItems, removeUserCartItems, removeOrderedCartItems, destroyCart } = require("../controllers/cartController")

const router = express.Router()

//https://olx-express-backend.vercel.app/api/cart/additem
router
    .route("/additem").post(addToCart)

//https://olx-express-backend.vercel.app/api/cart/getcartitems
router
    .route("/getcartitems/:id").get(getUserCartItems)

//https://olx-express-backend.vercel.app/api/cart/removecartitems
router
    .route("/removecartitems/:id").get(removeUserCartItems)

//https://olx-express-backend.vercel.app/api/cart/remove/ordered
router
    .route("/remove/ordered").post(removeOrderedCartItems)

//https://olx-express-backend.vercel.app/api/cart/destroy
router
    .route("/destroy").delete(destroyCart)
module.exports = router
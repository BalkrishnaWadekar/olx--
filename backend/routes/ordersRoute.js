const express = require("express")
const { placeOrder, destroyOrders, getUserOrderedItems, receivedOrders_User } = require("../controllers/ordersController")

const router = express.Router()

//https://olx-express-backend.vercel.app/api/orders/placeorder
router
    .route("/placeorder").post(placeOrder)

//https://olx-express-backend.vercel.app/api/orders/destroy
router
    .route("/destroy").delete(destroyOrders)

//https://olx-express-backend.vercel.app/api/orders/get/ofuser/
router
    .route("/get/ofuser/:id").get(getUserOrderedItems)

//https://olx-express-backend.vercel.app/api/orders/received/
router
    .route("/received/:id").get(receivedOrders_User)

module.exports = router
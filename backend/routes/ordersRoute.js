const express = require("express")
const { placeOrder, destroyOrders, getUserOrderedItems, receivedOrders_User } = require("../controllers/ordersController")

const router = express.Router()

//http://localhost:5000/api/orders/placeorder
router
    .route("/placeorder").post(placeOrder)

//http://localhost:5000/api/orders/destroy
router
    .route("/destroy").delete(destroyOrders)

//http://localhost:5000/api/orders/get/ofuser/
router
    .route("/get/ofuser/:id").get(getUserOrderedItems)

//http://localhost:5000/api/orders/received/
router
    .route("/received/:id").get(receivedOrders_User)

module.exports = router
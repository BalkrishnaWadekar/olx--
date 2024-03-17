const express = require("express")
const adminRoute = require("./routes/adminRoutes")
const userRoute = require("./routes/userRoutes")
const authRoute = require("./routes/authRoutes")
const productRoute = require("./routes/productRoutes")
const cartRoute = require("./routes/cartRoutes")
const ordersRoute = require("./routes/ordersRoute")
require("dotenv").config({ path: "./config/.env" })
const app = express()
const { db } = require("./config/db")
const cors = require("cors")

app.use(express.static("public"))

app.use(express.json())

app.use(cors(
    {
        origin: ["https://balkrishna-olx-frontend.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))

db()

const PORT = process.env.PORT

app.listen(PORT, err => {
    err && console.log("Error : ", err);
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
})


app.use("/api/admin", adminRoute)
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", ordersRoute)


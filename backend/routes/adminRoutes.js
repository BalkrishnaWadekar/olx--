const express = require("express")
const { adminRegister, adminLogin, allAdminData, destroyAdmin } = require("../controllers/adminController")

const router = express.Router()


//https://olx-express-backend.vercel.app/api/admin/register
router.route("/register").post(adminRegister)

//https://olx-express-backend.vercel.app/api/admin/login
router.route("/login").post(adminLogin)

//https://olx-express-backend.vercel.app/api/admin/alldata
router.route("/alldata").get(allAdminData)

//https://olx-express-backend.vercel.app/api/admin/destroy
router.route("/destroy").delete(destroyAdmin)

module.exports = router
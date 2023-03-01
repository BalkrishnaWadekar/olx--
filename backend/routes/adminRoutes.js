const express = require("express")
const { adminRegister, adminLogin, allAdminData, destroyAdmin } = require("../controllers/adminController")

const router = express.Router()


//http://localhost:5000/api/admin/register
router.route("/register").post(adminRegister)

//http://localhost:5000/api/admin/login
router.route("/login").post(adminLogin)

//http://localhost:5000/api/admin/alldata
router.route("/alldata").get(allAdminData)

//http://localhost:5000/api/admin/destroy
router.route("/destroy").delete(destroyAdmin)

module.exports = router
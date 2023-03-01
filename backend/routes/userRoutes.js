const express = require("express")
const { signUpUser, getAllUser, destroyUsers, deleteUserByAdmin } = require("../controllers/userController")

const router = express.Router()

// http://localhost:5000/api/user/signup
router.route("/signup").post(signUpUser)

// http://localhost:5000/api/user/getallusers
router.route("/getallusers").get(getAllUser)

// http://localhost:5000/api/user/delete
router.route("/delete/:userId").delete(deleteUserByAdmin)

// http://localhost:5000/api/user/destroyusers
router.route("/destroyusers").delete(destroyUsers)

module.exports = router
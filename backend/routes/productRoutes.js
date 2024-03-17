const express = require("express")
const { addProduct, getAllProducts, destroyAllProducts, getToVerifyProducts, getAllRejectedProducts, adminProductControls, getAllVerifiedProducts, getAllPublishedProducts, editRejectedProduct, deleteSingleProduct, getUserProducts, destroyUserProducts } = require("../controllers/productController");

const { upload } = require("../middleware/upload");
const { protected } = require("../middleware/protected");

const router = express.Router()

//https://olx-express-backend.vercel.app/api/product/add 
router.route("/add").post(protected, upload.single("productImage"), addProduct)

//https://olx-express-backend.vercel.app/api/product/getall 
router.route("/getall").get(getAllProducts)

//https://olx-express-backend.vercel.app/api/product/gettoverify 
router.route("/gettoverify").get(getToVerifyProducts)

//https://olx-express-backend.vercel.app/api/product/all/rejected 
router.route("/all/rejected").get(getAllRejectedProducts)

//https://olx-express-backend.vercel.app/api/product/all/verified 
router.route("/all/verified").get(getAllVerifiedProducts)

// https://olx-express-backend.vercel.app/api/product/admincontrols
router.route("/admincontrols/:id").put(adminProductControls)

// https://olx-express-backend.vercel.app/api/product/edit/rejected
router.route("/edit/rejected/:id").put(upload.single("productImage"), editRejectedProduct)

//https://olx-express-backend.vercel.app/api/products/user/
router.route("/user/:userId").get(getUserProducts)

//https://olx-express-backend.vercel.app/api/product/delete 
router.route("/delete/:id").delete(deleteSingleProduct)

//https://olx-express-backend.vercel.app/api/product/userwise/destroy/ 
router.route("/userwise/destroy/:userId").delete(destroyUserProducts)

//https://olx-express-backend.vercel.app/api/product/destroy 
router.route("/destroy").delete(destroyAllProducts)

module.exports = router;

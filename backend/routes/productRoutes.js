const express = require("express")
const { addProduct, getAllProducts, destroyAllProducts, getToVerifyProducts, getAllRejectedProducts, adminProductControls, getAllVerifiedProducts, getAllPublishedProducts, editRejectedProduct, deleteSingleProduct, getUserProducts, destroyUserProducts } = require("../controllers/productController");

const { upload } = require("../middleware/upload");
const { protected } = require("../middleware/protected");

const router = express.Router()

//http://localhost:5000/api/product/add 
router.route("/add").post(protected, upload.single("productImage"), addProduct)

//http://localhost:5000/api/product/getall 
router.route("/getall").get(getAllProducts)

//http://localhost:5000/api/product/gettoverify 
router.route("/gettoverify").get(getToVerifyProducts)

//http://localhost:5000/api/product/all/rejected 
router.route("/all/rejected").get(getAllRejectedProducts)

//http://localhost:5000/api/product/all/verified 
router.route("/all/verified").get(getAllVerifiedProducts)

// http://localhost:5000/api/product/admincontrols
router.route("/admincontrols/:id").put(adminProductControls)

// http://localhost:5000/api/product/edit/rejected
router.route("/edit/rejected/:id").put(upload.single("productImage"), editRejectedProduct)

//http://localhost:5000/api/products/user/
router.route("/user/:userId").get(getUserProducts)

//http://localhost:5000/api/product/delete 
router.route("/delete/:id").delete(deleteSingleProduct)

//http://localhost:5000/api/product/userwise/destroy/ 
router.route("/userwise/destroy/:userId").delete(destroyUserProducts)

//http://localhost:5000/api/product/destroy 
router.route("/destroy").delete(destroyAllProducts)

module.exports = router;

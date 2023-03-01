const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads"),
    filename: (req, file, cb) => {
        console.log(file);
        console.log("XXXX");
        const ext = path.extname(file.originalname)
        const fn = Date.now() + ext
        req.body.productImage = `uploads/${fn}`
        cb(null, fn)
    }
})

exports.upload = multer({ storage })
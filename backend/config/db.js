const mongoose = require("mongoose")

exports.db = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("DATABASE CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILED, Error : ", error);
    }
}

const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

// mongoose.connect(URI);
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection successfull to the Database");

    } catch (error) {
        console.error(error);
        process.exit(0);
    }
};

module.exports = connectDB;

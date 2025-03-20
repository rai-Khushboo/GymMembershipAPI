const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MongoDB URI is missing. Make sure to set MONGO_URI in your .env file.");
        }

        await mongoose.connect(uri);
        console.log("Connected to database");
    } catch (err) {
        console.error("Database Connection failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

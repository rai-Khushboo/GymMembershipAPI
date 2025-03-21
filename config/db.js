const mongoose = require("mongoose");
require("dotenv").config();
const Member = require("../models/Member"); // Import Member model

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("MongoDB URI is missing. Make sure to set MONGO_URI in your .env file.");
        }

        await mongoose.connect(uri);
        console.log("✅ Connected to database");

        // Seed sample data if no members exist
        const existingMembers = await Member.countDocuments();
        if (existingMembers === 0) {
            const sampleMembers = [
                {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    phone: "9876543210",
                    membershipType: "Premium",
                },
                {
                    name: "Jane Smith",
                    email: "janesmith@example.com",
                    phone: "9876543211",
                    membershipType: "Basic",
                }
            ];
            await Member.insertMany(sampleMembers);
            console.log("✅ Sample data inserted");
        }
    } catch (err) {
        console.error("❌ Database Connection failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

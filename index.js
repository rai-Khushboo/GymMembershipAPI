const express = require("express");
const dotenv = require("dotenv");   
dotenv.config();
const connectDB = require("./config/db");
const errHandler = require("./middleware/errHandler");
const memberRoutes = require("./routes/memberRoutes");

const app = express();
connectDB();

//Middlewares
app.use(express.json());
app.use(errHandler);

//setting up routers
app.use('/api/members', memberRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
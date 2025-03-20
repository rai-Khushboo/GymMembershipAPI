require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//connecting to database
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err)
)


//setting up routers
app.use('api/members' , require('./routes/memberRoutes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
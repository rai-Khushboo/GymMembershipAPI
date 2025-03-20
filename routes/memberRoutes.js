const express = require("express");
const router = express.Router();

const { registerMember, getMemberProfile, getAllMembers } = require("../controllers/memberController");

//register a member
router.post("/", registerMember);


//get user
router.get("/:id", getMemberProfile);

//getting all users
router.get("/", getAllMembers);

module.exports = router;
const express = require("express");
const router = express.Router();

const Member = require("../models/Member");

//register a member
router.post("/", async (req, res) => {
    try{
        const {name , email, phone , memberShipType} = req.body;

        //check if member already exists
        const existingMember = await Member.findOne({email});
        if(existingMember){
            return res.status(400).json({msg : "Member already exists"});
        }
        
        //creating a new member
        const newMember = new Member({
            name, email , phone , memberShipType
        })

        await newMember.save();
        res.status(201).json(newMember);
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Server Error"});
    }
});


//get user
router.get("/:id", async (req, res) => {
    try{
        const members = await Member.find(req.params.id);
        if(!members){
            return res.status(404).json({msg : "Member not found"});
        }
        res.json(members);
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Server Error"});
    }
});

//getting all users
router.get("/", async (req, res) => {
    try{
        const members = await Member.find();
        res.json(members);
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Server Error"});
    }
});

module.exports = router;
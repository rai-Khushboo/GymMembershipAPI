const Member = require("../models/Member");

const registerMember = async (req, res) => {
    try {
        const { name, email, phone, membershipType } = req.body;

        //check if member already exists
        const existingMember = await Member.findOne({email});
        if(existingMember){
            return res.status(400).json({msg : "Member already exists"});
        }

        const newMember = new Member({
            name, email, phone, membershipType
        });
        await newMember.save();
        res.status(201).json(newMember);
    }catch(err){
        console.log(err);
        res.status(500).json({msg : "Server Error"});
    }
};

//get a user
const getMemberProfile = async (req, res) => {
    try{
        const member = await Member.findById(req.params.id);
        if(!member){
            return res.status(404).json({msg : "Member not found"});
        }
        res.json(member);
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Server Error"});
    }
};

//getting all the user
const getAllMembers = async (req, res) => {
    try{
        const members = await Member.find();
        res.json(members);
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg : "Server Error"});
    }
};

module.exports = { registerMember, getMemberProfile, getAllMembers };
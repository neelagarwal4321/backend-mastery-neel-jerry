const express = require('express');
const app = express();

app.use(express.json());

// array object
const user = [];

// POST api

app.post("/profile", (req,res) => {
    try{
        const {name,age,role} = req.body;
        if(!name || age===undefined || !role){
            res.status(400).json({sucess:false, message:"mention a name, age and role of the user."});
        }
        const new_user = [{
            id: Date.now(),
            name,
            age,
            role: role||"default"
        }];
        user.push(new_user);
        res.status(201).json({sucess:true, message:"success, new user created", data:user});
    }
    catch(error){
        res.status(500).json({sucess:false, message:"Internal server error.", error:error.message});
    }
});

// GET api

app.get("/profile", (req,res) => {
    try{
        res.status(200).json({success:true, message:"success", data:user});
    }
    catch(error){
        res.status(500).json({success:false, message:"internal server error.", error:error.message});
    }
});

app.listen(3000, () => {
    console.log("server is running on port 3000.");
});
const express = require('express');
const path = require('path');
const app = express();

app.set("view engine", "ejs");
app.use(express.json()); // allows to create request.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/profile", async(req,res) => {
    try{
        // we are passing the query in the url with these params
        const {sex, age} = req.query;
        // all objects
        const user = [{
            id: 100,
            name: "Neel",
            sex: "Male",
            age: 23
        }, {
            id: 101,
            name: "Riya",
            sex: "Female",
            age: 23
        }, {
            id: 103,
            name: "Travis",
            sex: "Male",
            age: 15
        }, {
            id: 104,
            name: "Lucy",
            sex: "Female",
            age: 17
        }];
        if(sex && age){
            if(String(sex)==="Female"){
                res.status(200).json({sucess:true, message:"success", data:user});
            }
            else if(String(sex)==="Male" && Number(age)>18){
                res.status(200).json({sucess:true, message:"success", data:user});
            }
            else{
                res.status(403).json({sucess:false, message:"must be a Female or above 18"});
            }
        }
        res.status(200).json({sucess:true, message:"success", data:user});
    }
    catch(error){
        res.status(500).json({sucess:false, message:"internal server error", error:error.message});
    }
});

// post API
app.post("/feed", (req, res) => {
    try{
        const {like} = req.body;
        if(like==undefined){
            res.status(400).json({success:false, message:"like is required"});
        }
        const feed = [{
            id: Date.now(),
            name: "neel-nudes",
            like,
        }];
        res.status(201).json({success:true, message:"video has been liked", data:feed});
    }
    catch(error){
        res.status(500).json({success:false, message:"internal server error", error:error.message});
    }
});


// post API - name, role and age
// get API - profile

app.listen(3000, () => {
    console.log("Server is running on port 3000...")
});
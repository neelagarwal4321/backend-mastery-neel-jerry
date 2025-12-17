const express = require('express');
const path = require('path');
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/profile", async(req,res) => {
    try{
        const {name} = req.query;
        const {age} = req.query;
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
        }];
        if(sex && age){
            if(String(sex)=="Female"){
                res.status(200).json({sucess:true, message:"success", data:user});
            }
            else if(Number(age)>18){
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
const express = require("express");
const app = express();
const PORT = 3000;
const UserModel = require("./models/usermodel.js");
////Connect to data base
const {connect} = require("./config/database.js");
var cookieParser = require('cookie-parser')

/////create a server
connect()
.then(()=>{
    console.log("connected to database");
    app.listen(PORT,()=>{
        console.log("server started at port "+PORT);
    });
})
.catch((err)=>{
    console.log(err);
});
///////
app.use(express.json());
app.use(cookieParser())
app.post("/signup",async (req,res)=>{
    try{
        const userObj = req.body ;
        const user = new UserModel(userObj);
        await user.save();
        res.send("added user");
    }
    catch(err){
        console.log(err);
        res.send("pora puka");
    }
});

app.get("/feed",async (req,res)=>{
    let allData = await UserModel.find({}).lean();
    allData = allData.map( (val) => {
        delete val.password;
        return val;
    } )
    res.json(allData);
});

app.get("/user/:name",async (req,res)=>{
    let user = await UserModel.find({firstName:req.params.name}).lean();
    delete user.password;
    res.send(user);
})

/////
app.get("/setC",(req,res)=>{
    res.cookie("result","tcs");
    res.send("puka");
});
app.get("/getC",(req,res)=>{
    console.log( req.cookies.result ); 
    res.send("sulli");
})
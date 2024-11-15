const express = require("express");
const app = express();
const PORT = 3000;
const UserModel = require("./models/usermodel.js");
////Connect to data base
const {connect} = require("./config/database.js");
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
app.post("/signup",async (req,res)=>{
    const userObj = req.body ;
    const user = new UserModel(userObj);
    await user.save();
    res.send("added user");
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
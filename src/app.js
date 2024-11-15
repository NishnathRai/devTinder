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
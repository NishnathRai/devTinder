const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server started at port "+PORT);
});
app.use("/",(req,res)=>{
    res.send("Hellddddo world");
});
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
      firstName : String,
      lastName : String ,
      email : {
         type:String,
         validate: {
            validator: function (value) {
                return value.length > 10; 
            }, 
            message: "Email must be longer than 10 characters",
        },
      },
      password : String ,
      age : Number ,
      Gender : String 
});
const UserModel = mongoose.model( "User" , userSchema );

/////////

module.exports = UserModel ;
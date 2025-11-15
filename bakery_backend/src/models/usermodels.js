const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
  },
  lastname: { type: String, 
    trim: true },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    lowercase: true,
    trim: true
  },
  mobilenumber: {
    type: Number,
    required: [true, "Mobile number is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  profilePhoto: { 
    type: String,  
    default: ""
  },
  role: {  
    type: String,
    enum: ["user", "admin"],  
    default: "user"   // new users are "user" unless specified
  }
},
{
    collection: "user"
});

const userModel = mongoose.model("user", userSchema)
module.exports = userModel
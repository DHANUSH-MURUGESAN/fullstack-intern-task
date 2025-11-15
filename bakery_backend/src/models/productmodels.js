const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image:{
        type:String
    },
    recipe:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number
    },
    ingredients:{
        type:String,
        required:true
    }
},
{
    collection: "product"
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel
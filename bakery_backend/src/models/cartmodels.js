const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  itemId: {
    type: String
  },
  recipe: {
    type: String
  },
  price: {
    type: Number
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  ratings: {
    type: Number
  },
  cart: {
    type: Boolean,
    default: false,
  },
  quantity: { 
    type: Number, default: 1 
  }
},
{
    collection: "cart"
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;

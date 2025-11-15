const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
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
  wishlist: {
    type: Boolean,
    default: false,
  }
},
{
  collection: "wishlist"
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);

module.exports = Wishlist;

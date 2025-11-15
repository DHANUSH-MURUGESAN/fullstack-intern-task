const wishlistModel = require("../models/wish_models");

// Add item to wishlist
const addToWishlist = async (req, res) => {
  try {
    const data = req.body;

    // Check if already exists
    const exists = await wishlistModel.findOne({
      userId: data.userid,
      itemId: data.item._id,
    });

    if (exists) {
      return res.status(200).json({ message: "Item already in wishlist" });
    }

    const wishlistItem = new wishlistModel({
      userId: data.userid,
      itemId: data.item._id,
      recipe: data.item.recipe,
      price: data.item.price,
      image: data.item.image,
      description: data.item.description,
      ratings: data.item.ratings,
      wishlist: true, // when user likes, set to true
    });

    await wishlistItem.save();
    res.status(200).json(wishlistItem);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to wishlist", error: err.message });
  }
};

// Remove item from wishlist
// const removeFromWishlist = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;

//     const deleted = await wishlistModel.findOneAndDelete({
//       userId: userId,
//       itemId: itemId,
//     });

//     if (!deleted) {
//       return res.status(404).json({ message: "Item not found in wishlist" });
//     }

//     res.status(200).json({ message: "Item removed successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error removing from wishlist", error: err.message });
//   }
// };


const removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const removed = await wishlistModel.findOneAndDelete({ userId, itemId });
    // const removed = await wishlistModel.findOneAndUpdate(
    //   { userId },
    //   { $pull: { items: { itemId } } },
    //   { new: true }
    // );
    if (!removed) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item removed", removed });
  } catch (err) {
    console.error("Error removing wishlist item:", err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

// Get wishlist for a user
const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await wishlistModel.find({
      userId: userId,
      wishlist: true, // only liked items
    });

    res.status(200).json(wishlist);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: err.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};

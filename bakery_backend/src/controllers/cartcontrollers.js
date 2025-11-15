const cartModel = require("../models/cartmodels");

// Add item to wishlist
const addToCart = async (req, res) => {
  try {
    const data = req.body;

    // Check if already exists
    const exists = await cartModel.findOne({
      userId: data.userid,
      itemId: data.item._id,
    });

    if (exists) {
      return res.status(200).json({ message: "Item already in wishlist" });
    }

    const cartItem = new carttModel({
      userId: data.userid,
      itemId: data.item._id,
      recipe: data.item.recipe,
      price: data.item.price,
      image: data.item.image,
      description: data.item.description,
      ratings: data.item.ratings,
      cart: true, // when user cart an item, set to true
    });

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
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


const removeFromCart = async (req, res) => {
  try {
    // const { cartId } = req.params;
    const { userId, itemId } = req.body;
    console.log("Remove from cart request:", userId, itemId);

    if (!userId || !itemId) {
      return res.status(400).json({ message: "userId and itemId are required" });
    }

    const removed = await cartModel.findOneAndDelete({
      userId: userId,
      itemId: itemId,
    });
    // const removed = await wishlistModel.findOneAndUpdate(
    //   { userId },
    //   { $pull: { items: { itemId } } },
    //   { new: true }
    // );
    if (!removed) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, message: "Item removed successfully", removedItemId: itemId });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ success: false, error: "Failed to remove item" });
  }
};

// Get wishlist for a user
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await cartModel.find({
      userId: userId,
      cart: true, // only carted items
    });

    res.status(200).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: err.message });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};



// const cartModel = require("../models/cartmodels");

// // Add item to cart
// const addToCart = async (req, res) => {
//   try {
//     const data = req.body;

//     // Check if item already exists in user's cart
//     const exists = await cartModel.findOne({
//       userId: data.userid,
//       itemId: data.item._id,
//     });

//     if (exists) {
//       // If exists, increase quantity
//       exists.quantity += 1;
//       await exists.save();
//       return res.status(200).json({ 
//         message: "Item quantity updated", 
//         cart: exists 
//       });
//     }

//     // Create new cart item
//     const cartItem = new cartModel({
//       userId: data.userid,
//       itemId: data.item._id,
//       recipe: data.item.recipe,
//       price: data.item.price,
//       image: data.item.image,
//       description: data.item.description,
//       ratings: data.item.ratings,
//       quantity: 1,
//       cart: true,
//     });

//     await cartItem.save();
//     res.status(200).json({ 
//       message: "Item added to cart", 
//       cart: cartItem 
//     });
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//     res.status(500).json({ 
//       message: "Error adding to cart", 
//       error: err.message 
//     });
//   }
// };

// // Update quantity
// const updateQuantity = async (req, res) => {
//   try {
//     const { userId, itemId, quantity } = req.body;

//     if (!userId || !itemId || !quantity) {
//       return res.status(400).json({ 
//         message: "userId, itemId, and quantity are required" 
//       });
//     }

//     if (quantity < 1) {
//       return res.status(400).json({ 
//         message: "Quantity must be at least 1" 
//       });
//     }

//     const updated = await cartModel.findOneAndUpdate(
//       { userId, itemId },
//       { quantity },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Cart item not found" 
//       });
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: "Quantity updated", 
//       cart: updated 
//     });
//   } catch (err) {
//     console.error("Error updating quantity:", err);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to update quantity" 
//     });
//   }
// };

// // Remove item from cart
// const removeFromCart = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;
    
//     console.log("Remove request body:", req.body);
//     console.log("userId:", userId, "itemId:", itemId);

//     if (!userId || !itemId) {
//       console.log("Missing required fields");
//       return res.status(400).json({ 
//         message: "userId and itemId are required",
//         received: { userId, itemId }
//       });
//     }

//     const removed = await cartModel.findOneAndDelete({
//       userId: userId,
//       itemId: itemId,
//     });

//     if (!removed) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Item not found in cart" 
//       });
//     }

//     res.status(200).json({ 
//       success: true, 
//       message: "Item removed successfully", 
//       removedItemId: itemId 
//     });
//   } catch (err) {
//     console.error("Error removing cart item:", err);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to remove item" 
//     });
//   }
// };

// // Get cart for a specific user
// const getCart = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     if (!userId) {
//       return res.status(400).json({ 
//         message: "userId is required" 
//       });
//     }

//     const cart = await cartModel.find({
//       userId: userId,
//       cart: true,
//     });

//     res.status(200).json(cart);
//   } catch (err) {
//     console.error("Error fetching cart:", err);
//     res.status(500).json({ 
//       message: "Error fetching cart", 
//       error: err.message 
//     });
//   }
// };

// // Clear entire cart for a user
// const clearCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({ 
//         message: "userId is required" 
//       });
//     }

//     await cartModel.deleteMany({ userId });

//     res.status(200).json({ 
//       success: true, 
//       message: "Cart cleared successfully" 
//     });
//   } catch (err) {
//     console.error("Error clearing cart:", err);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to clear cart" 
//     });
//   }
// };

// module.exports = {
//   addToCart,
//   updateQuantity,
//   removeFromCart,
//   getCart,
//   clearCart,
// };
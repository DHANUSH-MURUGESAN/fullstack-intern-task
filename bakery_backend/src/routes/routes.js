const express = require('express')
const userController = require('../controllers/usercontrollers')
const menuController = require('../controllers/menucontrollers')
const productController = require('../controllers/productcontrollers')
const orderController = require('../controllers/ordercontrollers')
const wishlistController = require('../controllers/wishlistcontrollers')
const cartController = require('../controllers/cartcontrollers')
const uploads = require('../middleware/fileStorage')
const router = express.Router()

router.post("/signup", userController.userCreateController)
router.post("/login", userController.userLoginController)
router.get("/menu", menuController.menuGetController)
router.put("/update-profile/:id", uploads.single("photo"), userController.updateUserProfileController);
//Product creating in AdminDashboard 
router.post("/create", uploads.single("image"), productController.productCreateController)
router.get("/display", productController.productShowController)
router.put("/update/:id", uploads.single("image"), productController.productUpdateController)
router.delete("/delete/:id", productController.productDeleteController)
//Order Details
router.post("/orders", orderController.createOrder);
router.get("/orders/:userId", orderController.getOrders);
router.get("/orders", orderController.getAllOrders);
router.delete("/orders/:id", orderController.cancelOrder);
router.put("/orders/:id/status", orderController.updateStatus);
//Wishlist Details
router.post("/add", wishlistController.addToWishlist);
router.delete("/remove/:userId/:itemId", wishlistController.removeFromWishlist);
router.get("/:userId", wishlistController.getWishlist);
//Cart Details
router.post("/add", cartController.addToCart);
router.delete("/remove", cartController.removeFromCart);
router.get("/:userId", cartController.getCart);

/// user

router.get('/getuser/:id',userController.getsingleuser);

module.exports = router
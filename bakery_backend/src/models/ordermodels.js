const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  userId: String,
  items: [
    {
      recipe: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  deliveryDetails: {
    receiverName: String,
    mobile: Number,
    doorNo: String,        
    address: String,
    city: String,
    state:String,
    pincode: Number,
  },
  paymentMethod: String,
  totalPrice: Number,
  status: { type: String, default: "Pending" },
}, { timestamps: true });

// Auto-generate orderId
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = "SH-" + Date.now(); // e.g. SH-1695123456789
  }
  next();
},
{
    collection: "order"
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel
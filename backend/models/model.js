// models/model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'supplier', 'vendor'], default: 'customer' },
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  pricePerKg: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  unit: { type: String, default: 'kg' },
  minOrderQty: { type: Number, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  }],
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const GroupOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  targetQty: { type: Number, required: true },
  currentQty: { type: Number, default: 0 },
  status: { type: String, enum: ['open', 'completed', 'cancelled'], default: 'open' },
  deliveryDate: { type: Date },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, default: 0 },
    _id: false // Add this line for cleaner data structure
  }]
}, { timestamps: true });

module.exports = {
  User: mongoose.model('User', UserSchema),
  Product: mongoose.model('Product', ProductSchema),
  Order: mongoose.model('Order', OrderSchema),
  GroupOrder: mongoose.model('GroupOrder', GroupOrderSchema),
};
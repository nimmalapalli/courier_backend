const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  id: String,
  entity: String,
  amount: Number,
  currency: String,
  receipt: String,
  status: String,
  created_at: Number,
  searchId:{type:mongoose.Schema.ObjectId}
  // Add other fields as per your requirements
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

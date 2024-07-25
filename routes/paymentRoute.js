const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel'); // Adjust the path as per your project structure
const User = require('../models/user')
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_VLSc7qRsFdhdrf', // Replace with your key_id
  key_secret: 'avx5L9pXCMRhxBAkLDSAl8Xu' // Replace with your key_secret
});

router.post('/order', (req, res) => {
  const { amount, currency, receipt,searchId} = req.body;

  razorpayInstance.orders.create({ amount, currency, receipt }, (err, order) => {
    if (!err) {
      // Create a new payment document
      const payment = new Payment({
       searchId:searchId,
        id: order.id,
        entity: order.entity,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
        // Add other fields as per your requirements
      });

      // Save the payment document to MongoDB
      payment.save((err, savedPayment) => {
        if (!err) {
          res.json(savedPayment);
        } else {
          res.status(500).send(err);
        }
      });
    } else {
      res.status(500).send(err);
    }
  });
});

router.get('/getallpaymentDetails',async(req,res,next)=>{
  try {
    const payment = await Payment.aggregate([
        
        {
            $lookup:{
              from:User.collection.name,
              localField:'searchId',
              foreignField:'_id',
              as:'userDetails'
            }
        }
    ])
 
    res.status(200).json({ data: payment, message: 'All payment details are available' });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
}
})


router.post('/verifyOrder',  (req, res)=>{ 
    
  // STEP 7: Receive Payment Data
  const {order_id, payment_id} = req.body;     
  const razorpay_signature =  req.headers['x-razorpay-signature'];

  // Pass yours key_secret here
  const key_secret = YAEUthsup8SijNs3iveeVlL1;     

  // STEP 8: Verification & Send Response to User
  
  // Creating hmac object 
  let hmac = crypto.createHmac('sha256', key_secret); 

  // Passing the data to be hashed
  hmac.update(order_id + "|" + payment_id);
  
  // Creating the hmac in the required format
  const generated_signature = hmac.digest('hex');
  
  
  if(razorpay_signature===generated_signature){
      res.json({success:true, message:"Payment has been verified"})
  }
  else
  res.json({success:false, message:"Payment verification failed"})
});
module.exports = router;



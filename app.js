const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();
const ejs = require("ejs");
require("dotenv").config();
const cors = require('cors')
const twilio =require('twilio')
const authRoute = require('./routes/auth.route');
const router = require('./routes/router');
const pincodeRoute = require('./routes/pincodeRoute.js');
const shipmentRoute = require('./routes/shipmentRoute');
const paymentRoute = require('./routes/paymentRoute');
const appRoute = require('./routes/route');
const appController = require('./mailer/controller/appController');
const adminRoute = require('./routes/adminRoute');      
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const fileUpload = require('express-fileupload');
const path = require('path');
const Payment = require('./models/paymentModel.js')
const port = process.env.PORT || 8000;
const Razorpay = require('razorpay'); 
const nimbus =require('./routes/nimbuspost.js')

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({

    // Replace with your key_id
    key_id: 'rzp_test_VLSc7qRsFdhdrf',

    // Replace with your key_secret
    key_secret: 'avx5L9pXCMRhxBAkLDSAl8Xu'
});
// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/joprodexs', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

const uri = 
// ' mongodb+srv://nikhilareddygandlapati:fO8kXWN8aMJKyIyf@cluster0.emcygxj.mongodb.net/?retryWrites=true&w=majority';
`mongodb://localhost:27017`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB Atlas with Mongoose');
});



app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({ createParentPath: true }));
app.use(express.json());
app.use('/api',pincodeRoute);
app.use(express. urlencoded({extended:false}))
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});
// var client = new twilio(accountSid,authToken)
// var otp =Math.floor(100000+Math.random()*90000);
// var userEnteredOTP=''
// console.log(otp)
// app.post('/sendotp',(req,res)=>{
//     client.messages.create({
//         body:`hello hi nikhila ${otp}`,
//         to:'+919963760431',
//         from:'+19203546973'
//     })
//     .then((message)=>{
//         console.log('message sent:', message.sid);
//         res.status(200).send ('OTP send succesfully');
//     })
//     .catch((error)=>{
//         console.error('errorsending message:',error);
//         res.status(500).send('failed to send OTP');
//     })
// })    
// app.post('/verifyotp', (req, res) => {
//   userEnteredOTP = req.body.userEnteredOTP;

//   if (userEnteredOTP == otp.toString()) {
//       res.status(200).send('OTP verification successful');
//       console.log("valid otp");
//   } else {
//       res.status(400).send('Invalid OTP. Please Try Again.');
//   }
// });


// app.post('/createorder', (req, res)=>{ 


//   // STEP 1:
//   const {amount,currency,receipt}  = req.body;      
      
//   // STEP 2:    
//   razorpayInstance.orders.create({amount, currency, receipt}, 
//       (err, order)=>{
      
//         //STEP 3 & 4: 
//         if(!err){
//           res.json(order);
    
// }  
//         else{
//           res.send(err);
//       }
// })
// });


app.use('/api', authRoute);
app.use('/api', router);
app.use('/api', shipmentRoute);
app.use('/api',paymentRoute);
app.use('/api', appRoute);
app.use('/api',adminRoute);
app.use('/api',nimbus)




// const CourierService = require('./routes/courierService.js');
// require('dotenv').config();

// (async () => {
//     try {
//         // Example shipment details
//         const shipmentDetails = {
//             // Fill in with the required shipment details
//             "order_id": "12345",
//             "customer_name": "John Doe",
//             "customer_address": "123 Main St, City, State, Zip",
//             "customer_phone": "1234567890",
//             "order_items": [
//                 {
//                     "item_name": "Product 1",
//                     "item_quantity": 1,
//                     "item_price": 100
//                 }
//             ],
//             "order_value": 100,
//             "pickup_location_id": "your_pickup_location_id"
//         };

//         // Create a shipment with NimbusPost
//         const nimbuspostResponse = await CourierService.createShipment('nimbuspost', shipmentDetails);
//         console.log('NimbusPost Shipment Response:', nimbuspostResponse);

//         // Track a shipment with FedEx
//         const fedexResponse = await CourierService.trackShipment('fedex', '123456789');
//         console.log('FedEx Tracking Response:', fedexResponse);

//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// })();
 app.get('/',(req,res)=>{
  res.send('welcome to snv')
 })
//Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
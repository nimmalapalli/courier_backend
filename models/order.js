const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    order: {type:Number,unique:true},
    orderType: {type:String},
    fname: {type:String},
    lname: {type:String},
    companyName:{type:String},
    Address:{type:String},
    pincode:{type:String},
    city:{type:String},
    state:{type:String},
    payment:{type:Number},
    product:{type:String},
    phone:{type:String},
    weight:{type:String},
    length:{type:String},
    width:{type:String},
    height:{type:String},
    user_id:{type:mongoose.Schema.ObjectId}
});

module.exports = mongoose.model('order',orderSchema);
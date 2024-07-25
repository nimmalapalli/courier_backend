const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true},
    companyname:{type:String,required:true},
    
   
});

module.exports = mongoose.model('user',userSchema);

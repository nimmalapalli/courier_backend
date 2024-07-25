const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    navlist1:{type:String,required:true},
    navlist2:{type:String,required:true},
    navlist3:{type:String,required:true},
    navlist4:{type:String,required:true},
    navlist5:{type:String,required:true},
    navlist6:{type:String,required:true},
    navlist7:{type:String,required:true},
    navlist8:{type:String,required:true},
    navlist9:{type:String,required:true},
    navlist10:{type:String,required:true},

});

module.exports = mongoose.model('nav',userSchema);
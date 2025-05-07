const mongoose = require('mongoose');
const OwnerSchema = new mongoose.Schema({
    ownerId: { type: String, required: true, unique: true },
    name: {type: String , required : true},
    password: {type:String,required:true},
    email: {type: String, required:true, unique:true, ref: 'User'},
    phone: {type: String },
    roomNo: String,
    dob: Date,
    adhaar: String

  });
  
  module.exports = mongoose.model('Owner', OwnerSchema);
  
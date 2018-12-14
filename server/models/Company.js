const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;


const CompanySchema = new Schema({
  name: String,
  address: String,
  position: {
    lat:Number,
    lng:Number
  }
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const ValuationSchema = new Schema({
  opinion: String,
  rate: Number
});

const Valuation = mongoose.model('Valuation', ValuationSchema);
module.exports = Valuation;
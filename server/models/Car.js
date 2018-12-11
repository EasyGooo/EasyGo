const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;


const CarSchema = new Schema({
  model: String,
  licensePlate: String,
  description: String
});

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
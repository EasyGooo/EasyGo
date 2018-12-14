const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;


const StartPointSchema = new Schema({

  address: String,
  position: {
    lat:Number,
    lng:Number
  }
});

const StartPoint= mongoose.model('StartPoint', StartPointSchema);
module.exports = StartPoint;
const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const JourneySchema = new Schema({
 
  startPoint:{
  address: String,
  position: {
    lat:Number,
    lng:Number
  }
},
  endPoint:{
  address: String,
  position: {
    lat:Number,
    lng:Number
  }
},
  company: String,
  places: Number,
  date: String,
  hour: String,
  authorId: {
  type: Schema.Types.ObjectId,
  ref: 'User',
}
});

const Journey = mongoose.model('Journey', JourneySchema);
module.exports = Journey;
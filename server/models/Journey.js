const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const JourneySchema = new Schema({
 
});

const Journey = mongoose.model('Journey', JourneySchema);
module.exports = Journey;
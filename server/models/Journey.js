const mongoose = require("mongoose");

const { Schema } = mongoose;

const JourneySchema = new Schema({
  startPoint: {
      lat: Number,
      lng: Number
    
  },
  endPoint: {
      lat: Number,
      lng: Number
    
  },
  company: String,
  places: Number,
  date: String,
  time: String,
  description: String,
  distance:Number,
  duration:Number,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Journey = mongoose.model("Journey", JourneySchema);
module.exports = Journey;

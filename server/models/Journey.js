const mongoose = require("mongoose");

const { Schema } = mongoose;

const JourneySchema = new Schema({
  coorstart: {
      lat: Number,
      lng: Number
    
  },
  coorend: {
      lat: Number,
      lng: Number
    
  },
  company: String,
  places: Number,
  price:String,
  date: String,
  time: String,
  description: String,
  distance:String,
  duration:String,
  username:String,
  imgPath:String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Journey = mongoose.model("Journey", JourneySchema);
module.exports = Journey;

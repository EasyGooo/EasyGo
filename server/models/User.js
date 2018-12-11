require('dotenv').config();
require('./Car');
require('./Journey');
require('./Valuation');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
   username: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  imgName: {
    type: String,
    default: 'defaultProfile.png',
  },
  imgPath: {
    type: String,
    default: process.env.CLOUDINARY_DEFAULTPROFILE_IMG,
  },
  cars: [{
    type: Schema.Types.ObjectId,
    ref: 'Car',
  }],
  journeys: [{
    type: Schema.Types.ObjectId,
    ref: 'Journey',
  }],
  valuations: [{
    type: Schema.Types.ObjectId,
    ref: 'Valuation',
  }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
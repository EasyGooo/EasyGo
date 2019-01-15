const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valorationSchema= new Schema({
  authorId:{type: Schema.Types.ObjectId , ref:"User"},
  username:String,
  imgPath:String,
  comment:String,
  rate:Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
  })
const Valoration = mongoose.model('Valoration', valorationSchema);
module.exports = Valoration;
const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  authorId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receptorId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  type:{type:String,enum:['reqPlace','resPlace','reqStop']},
  status:{type:String, enum:["Pendding", "Accepted", "Denied"], default:"Pendding"},
  company:String

});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;


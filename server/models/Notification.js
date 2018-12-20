const mongoose = require("mongoose");

const { Schema } = mongoose;

const NotificationSchema = new Schema({
 
  authorId:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  receptorId:String,
  type:String

});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;


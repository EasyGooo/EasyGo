const express = require("express");
const notificationsRoutes = express.Router();
const Notification= require("../models/Notification");
const User = require("../models/User");

notificationsRoutes.get('/show' ,(req,res,next)=>{
  Notification.findOne({receptorId:req.user.id})
  .then(notifications=>{
    res.json(notifications)
  })
})

notificationsRoutes.get('/delete' ,(req,res,next)=>{
  Notification.findOneAndRemove({receptorId:req.user.id})
  .then(notifications=>{
    res.json(notifications)
  })
})


notificationsRoutes.post("/create",(req, res, next) => {
  const {receptorId,type}=req.body;
  
  const newNotification = new Notification({
    authorId:req.user.id,
    receptorId,
    type
  })
 
  Notification.create(newNotification)
  .then((myNotification) => {
    User.findByIdAndUpdate(req.user.id, { $push: { notifications: myNotification } })
  })
  .catch(err => next(err));
})


module.exports = notificationsRoutes;
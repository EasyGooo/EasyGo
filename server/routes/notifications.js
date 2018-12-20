const express = require("express");
const notificationsRoutes = express.Router();
const Notification= require("../models/Notification");
const User = require("../models/User");
const Journey = require("../models/Journey");

//crea notificacion
notificationsRoutes.post("/create",(req, res, next) => {
  const {receptorId,type,company, journeyId}=req.body;
  
  const newNotification = new Notification({
    authorId:req.user.id,
    receptorId,
    type,
    company
  })
 
  Notification.create(newNotification)
  .then(() => {
    return Journey.findByIdAndUpdate(journeyId, {$inc:{places:-1}})
  })
  .then(() => {
    res.status(200).json({msg:"OK"})
  })
  .catch(err => next(err));
})

//mostrar notifs que me llegan
notificationsRoutes.get('/show' ,(req,res,next)=>{
  Notification.find({receptorId:req.user.id})
  .then(notifications=>{
    res.json(notifications)
  })
})

//mostrar notifs que envio
notificationsRoutes.get('/showown', (req, res) => {
  Notification.find({authorId:req.user._id})
  .then(notifications => {res.status(200).json(notifications)})
})

notificationsRoutes.post('/status', (req, res) => {
  const {status, idNotification} = req.body;
  if(status !== "Accepted" && status !== "Denied"){
    res.status(500).json({msg: "Error status"})
  }
  Notification.findByIdAndUpdate(idNotification, {status}, {new:true})
  .then(notification => {
    res.status(200).json(notification)
  })
  .catch(err => {
    res.status(500).json({msg: "ERROR"})
  })
})

notificationsRoutes.post('/change', (req, res, next) => {

  const {places,journeyId}=req.body;

  Journey.findByIdAndUpdate(journeyId,{$set:{places:places}},{ new:true })
    .then((result) => res.json(result))
    .catch(err => console.log(`${err} in profile/settings`));
});


module.exports = notificationsRoutes





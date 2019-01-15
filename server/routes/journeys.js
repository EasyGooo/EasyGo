const express = require("express");
const journeysRoutes = express.Router();
const Journey = require("../models/Journey");
const User = require("../models/User");
const Company = require("../models/Company");

journeysRoutes.get('/journeys' ,(req,res,next)=>{
  Journey.find()
  .then(journeys=>{
    res.json(journeys)
  })
})

journeysRoutes.get('/journeys/:id', (req, res, next) => {
  console.log(req.params.id)
Journey.findById(req.params.id)

.then(journey=>{
  res.json({journey})

})
  
});


journeysRoutes.get('/myjourneys', (req, res, next) => {
  Journey.findOne({authorId: req.user.id})
  .then(journeys=>{
    res.json({journeys})
  })
    
  });

journeysRoutes.post("/create",(req, res, next) => {
  console.log(req.body.price)
  const {coorstart,coorend,company,places,date,time,description,distance,price,duration,username,imgPath}=req.body;
  
  const newJourney = new Journey({
    coorstart,
    coorend,
    company,
    description,
    places,
    date,
    price,
    time,
    distance,
    duration,
    authorId: req.user.id,
    username,
    imgPath
  }) 
  
  Journey.create(newJourney)
  .then((myJourney) => {
    User.findByIdAndUpdate(req.user.id, { $push: { journeys: myJourney } })
    .then(() => res.status(200).json({msg:"OK"}))
  })
  .catch(err => next(err));
})


journeysRoutes.post("/car",(req, res, next) => {
  const {model,licensePlate,description}=req.body;
  
  const newCar = new Car({
    model,
    licensePlate,
    description, 
    authorId: req.user.id
  }) 
  
  Car.create(newCar)
  .then((myCar) => {
    User.findByIdAndUpdate(req.user.id, { $push: { cars: myCar } })
  })
  .catch(err => next(err));
})


module.exports = journeysRoutes;
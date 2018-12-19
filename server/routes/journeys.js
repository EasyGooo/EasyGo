const express = require("express");
const journeysRoutes = express.Router();
const Journey = require("../models/Journey");
const Valuation = require("../models/Valuation");
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
  const {coorstart,coorend,company,places,date,time,description,distance,duration}=req.body;
  
  const newJourney = new Journey({
    coorstart,
    coorend,
    company,
    description,
    places,
    date,
    time,
    distance,
    duration,
    authorId: req.user.id
  }) 
  
  Journey.create(newJourney)
  .then((myJourney) => {
    User.findByIdAndUpdate(req.user.id, { $push: { journeys: myJourney } })
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


module.exports = journeysRoutes
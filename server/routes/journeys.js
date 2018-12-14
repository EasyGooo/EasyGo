const express = require("express");
const journeysRoutes = express.Router();
const Journey = require("../models/Journey");
const Valuation = require("../models/Valuation");
const Company = require("../models/Company");

journeysRoutes.get('/companies' ,(req,res,next)=>{
  Company.find()
  .then(companies=>{
    res.json(companies)
  })
})

journeysRoutes.get('/journeys/:id', (req, res, next) => {
User.findById(req.params._id)
.populate("journeys")
.then(journeys=>{
  res.json({journeys})
})
  
});

journeysRoutes.post("/create",(req, res, next) => {
  const {startPoint,endPoint,company,places,date,hour}=req.body;
  
  const newJourney = new Journey({
    startPoint,
    endPoint,
    company,
    places,
    date,
    hour,
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


module.exports = journeysRoutes;
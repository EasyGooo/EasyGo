const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const Valoration = require("../models/Valoration");
const uploadCloud = require("../config/cloudinary");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return res.status(500).json({message: "Error login"}
      
      ) }
      
    if (!user) { return res.status(500).json({message: "Error login"}) }

    req.logIn(user, function(err) {
      if (err) {
        console.log(err)
        return res.status(500).json({message: "Error login"}) }
      return res.status(200).json(user);
    });
  })(req, res, next);
});


authRoutes.post("/signup", uploadCloud.single("photo"), (req, res, next) => {
  const { username, password, email } = req.body;
  const imgPath = req.file.url;

  // console.log(req.file.url);
  
  if (username === "" || password === "") {
    res.status(500).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(500).json({ message: "The username already exists" })
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      imgPath,
      email
    });

    newUser.save()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message:"Something went wrong"})
    })
  });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({message: "Logout"});
});

authRoutes.get('/loggedin', (req, res) => {
  if(req.isAuthenticated()) {
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({message: "Unauthorized"});
  }
})



//edit user



authRoutes.post('/settings', (req, res, next) => {
  const userId = req.body.userid;
  const myUser = {};

  if (req.body.email) {
    myUser.email = req.body.email;
  }

  if (req.body.username) {
    myUser.username = req.body.username;
  }

  if (req.body.password) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    myUser.password = hashPass;
  }

  if (req.file) {
    myUser.imgPath = req.file.url;
    myUser.imgName = req.file.originalname;
  }

  User.findByIdAndUpdate(userId,  myUser, { new:true })
    .then(() => res.json(myUser))
    .catch(err => console.log(`${err} in profile/settings`));
});


authRoutes.post("/valoration", (req, res, next) => {
  const { comment,rate,username,imgPath } = req.body;
    const newValoration = new Valoration({
      authorId,
      username,
      imgPath,
      comment,
      rate,
    });
    newValoration.save()
    .then(valoration => {
      res.status(200).json(valoration)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({message:"Something went wrong"})
    })
  
});
module.exports = authRoutes;

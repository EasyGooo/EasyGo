
// routes/index.js
require('dotenv').config();
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary.js');
const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const bcrypt = require('bcrypt');

const bcryptSalt = 10;

const profileRouter = express.Router();


profileRouter.get('/profile', (req, res, next) => {
  res.json({"hola": true});
});


profileRouter.post('/profile', [ensureLoggedIn('/auth/login'), uploadCloud.single('photo')], (req, res, next) => {
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
    .then(() => res.redirect('/profile'))
    .catch(err => console.log(`${err} in profile/settings`));
});

module.exports = profileRouter;
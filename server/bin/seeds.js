
// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();

const User = require('../models/User');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });



const users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('admin', bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: 'admin1',
    password: bcrypt.hashSync('admin1', bcrypt.genSaltSync(bcryptSalt)),
  },
];

User.create(users)
  .then((usersCreated) => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
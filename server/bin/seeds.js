
// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();

const User = require('../models/User');
const Company = require('../models/Company')
const StartPoint = require('../models/StartPoint')
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
    email: "admin@admin.com"
  },
  {
    username: 'admin1',
    password: bcrypt.hashSync('admin1', bcrypt.genSaltSync(bcryptSalt)),
  },
];
const companies = [
  {
    name:"Daikin AC Spain S.A",
    address:"C/ Vía de los Poblados, 1",
    position:{
        lat:40.476060,
        lng:-3.636175
    }
  },
  {
    name:"Aegon Seguros",
    address:"C/ Vía de los Poblados, 3",
    position:{
        lat:40.476928,
        lng:-3.633420
    }
  },
  {
    name:"Iberdrola S.A.",
    address:"C/ Tomás Redondo, 1",
    position:{
        lat:40.473070,
        lng:-3.630874
    }
  },
  {
    name:"Plenilunio",
    address:"C/ Aracne,s/n",
    position:{
        lat:40.446991,
        lng:-3.587365
    }
  },
  {
    name:"Altran España",
    address:"C/ Campezo,1",
    position:{
        lat:40.448591,
        lng:-3.581882
    }
  },
  {
    name:"Madrid Marriott Auditorium",
    address:"Avenida de Aragón 400",
    position:{
        lat:40.448315,
        lng:-3.558665
    }
  },
];
const startpoints = [
  {
    address:"C/ Lombía, 1",
    position:{
        lat:40.426020,
        lng:-3.672502
    }
  },
  {
    address:"C/ Alcalá, 150",
    position:{
        lat:40.427685,
        lng:-3.669478
    }
  },
  {
    address:"C/ Conde de Peñalver, 15",
    position:{
        lat:40.426371,
        lng:-3.675635
    }
  },
]
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

Company.create(companies)
  .then((companiesCreated) => {
    console.log(`${companiesCreated.length} companies created `);
    console.log(companiesCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
StartPoint.create(startpoints)
  .then((startpointsCreated) => {
    console.log(`${startpointsCreated.length} startpoints created `);
    console.log(startpointsCreated.map(u => u._id));
  })
  .then(() => {
  // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
//const log = require('simple-node-logger').createSimpleFileLogger('screens.log');

const { user } = require("../models");
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Employee = db.employee
const Sequelize = require('sequelize');
const news = require("../routes/user.routes");

exports.allAccess = (req, res) => {
  
  res.status(200).send("Public Content. \n Welcome to the Antartica ");

};
// /api/test/users?field=valA&toOrder=valB
// "/api/test/users?field=valA&toOrder=valB&limit=pgLimit&offset=pgOffset"
exports.userBoard = (req, res) => {
  field = req.query.field
  toOrder = req.query.toOrder
  pgLimit = req.query.pgLimit
  pgOffset = req.query.pgOffset
  if (!req.query.field){
    field = 'id'
  }
  if (!req.query.toOrder){
    toOrder = 'DESC'
  }
  if (!req.query.pgLimit){
    pgLimit = 10
  }
  if (!req.query.pgOffset){
    pgOffset = 0
  }
  
  User.findAndCountAll({attributes: ['username', 'email', 'id', 'createdAt', 'firstname', 'lastname', 'organization'],
  order: [
    [field, toOrder]
  ],
  limit: parseInt(pgLimit),
  offset: parseInt((pgOffset))
})
  .then(ur => {
    res.status(200).json(ur)
  })
  .catch(error => {
    res.status(400).send(error)
  })
};


exports.byID = (req, res) => {
  ids = req.params.id
  User.findOne({
    where: {
      id: ids
    }
  }).then(idd => {
    if (idd) {
      res.status(200).json(idd)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };

exports.byUsername = (req, res) => {
  username = req.params.username
  User.findOne({
    where: {
      username: username
    }
  }).then(username => {
    if (username) {
      res.status(200).json(username)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };


exports.byLname = (req, res) => {
  lastname = req.params.lname
  User.findAll({
    where: {
      lastname: lastname
    }
  }).then(lastname => {
    if (lastname) {
      res.status(200).json(lastname)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };
exports.byFname = (req, res) => {
  firstname = req.params.fname
  User.findAll({
    where: {
      firstname: firstname
    }
  }).then(firstname => {
    if (firstname) {
      res.status(200).json(firstname)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };

exports.byMail = (req, res) => {
  email = req.params.mail
  User.findOne({
    where: {
      email: email
    }
  }).then(email => {
    if (email) {
      res.status(200).json(email)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };



///
exports.employeeBoard = (req, res) => {
  field = req.query.field
  toOrder = req.query.toOrder
  pgLimit = req.query.pgLimit
  pgOffset = req.query.pgOffset
  if (!req.query.field){
    field = 'id'
  }
  if (!req.query.toOrder){
    toOrder = 'DESC'
  }
  if (!req.query.pgLimit){
    pgLimit = 10
  }
  if (!req.query.pgOffset){
    pgOffset = 0
  }
  Employee.findAndCountAll({attributes: ['username', 'email', 'id', 'createdAt', 'firstname', 'lastname', 'organization'],
  order: [
    [field, toOrder]
  ],
  limit: parseInt(pgLimit),
  offset: parseInt((pgOffset))
})
  .then(ur => {
    res.status(200).json(ur)
  })
  .catch(error => {
    res.status(400).send(error)
  })
};


exports.EbyID = (req, res) => {
  ids = req.params.id
  Employee.findOne({
    where: {
      id: ids
    }
  }).then(idd => {
    if (idd) {
      res.status(200).json(idd)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };

exports.EbyUsername = (req, res) => {
  username = req.params.username
  Employee.findOne({
    where: {
      username: username
    }
  }).then(username => {
    if (username) {
      res.status(200).json(username)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };


exports.EbyLname = (req, res) => {
  lastname = req.params.lname
  Employee.findAll({
    where: {
      lastname: lastname
    }
  }).then(lastname => {
    if (lastname) {
      res.status(200).json(lastname)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };
exports.EbyFname = (req, res) => {
  firstname = req.params.fname
  Employee.findAll({
    where: {
      firstname: firstname
    }
  }).then(firstname => {
    if (firstname) {
      res.status(200).json(firstname)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };

exports.EbyMail = (req, res) => {
  email = req.params.mail
  Employee.findOne({
    where: {
      email: email
    }
  }).then(email => {
    if (email) {
      res.status(200).json(email)
  }})
    .catch(error => {
      res.status(400).send(error)
    })
  };



// exports.employeeBoard = (req, res) => {
  
//   res.status(200).send("Employee Content. \n - Search Users \n - Post new Job Opening");
// };


let Note = db.sequelize.define('notes', {
  description: Sequelize.STRING
});


async function findAllRows() {

  let notes = await Note.findAll({ raw: true });
  console.log(notes);

  sequelize.close();
}
  


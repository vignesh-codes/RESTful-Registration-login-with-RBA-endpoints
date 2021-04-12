const jwt = require("jsonwebtoken");
const { pageAccess } = require("../config/auth.config.js");
const config = require("../config/auth.config.js");
const db = require("../models");
const Employee = db.employee
const User = db.user;
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );
var our_user = []

//verify token when accessed to secured pages
verifyToken = (req, res, next) => {
  let token = req.headers["access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      log.warn(pageAccess+ " Unauthorised attempt to access internal secured page" )
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id; //get the id from DB for the entered token
    next();
  });
};


//if accessed employee's page
isEmployee = (req, res, next) => {
  Employee.findByPk(req.userId)
  .then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "employee") { //make sure role is employee from DB for that id
          Employee.findOne({
            where: {
              id : req.userId
            }
          })
          exports.accessedemployee = user.username;  //get the username who is accessing
          log.info(pageAccess+user.username+" Accessed Employee page " )
          next();
          return;
        }
      }
      Employee.findOne({
        where: {
          id : req.userId
        }
      })
        .then(user => {
          var authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(403).send({
              message: "Require Employee Role!"
            });
            log.warn(pageAccess+user.username+" tried to access Employees page without Employees role. User_role: " + authorities )
        })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
          
        });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });  
  });
 
})};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          User.findOne({
            where: {
              id : req.userId
            }
          })
          log.info(pageAccess+user.username+" accessed user page " )
          next();
          return;
        }
      }
      User.findOne({
        where: {
          id : req.userId
        }
      })
        .then(user => {
          var authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(403).send({
              message: "Require User or Employee Role!"
            });
            log.warn(pageAccess+user.username+" tried to access User page without User or User role. User_role:" + authorities )
        })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
      
    });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isEmployee: isEmployee,
  isUser: isUser
};
module.exports = authJwt, our_user;
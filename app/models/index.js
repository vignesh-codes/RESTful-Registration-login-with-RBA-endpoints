//importing and defining DB configs
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const { DB } = require("../config/db.config.js");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.employee = require("../models/employee.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.role.belongsToMany(db.employee, {
  through: "emp_roles",
  foreignKey: "eroleId",
  otherKey: "empId"
});
db.employee.belongsToMany(db.role, {
  through: "emp_roles",
  foreignKey: "empId",
  otherKey: "eroleId"
});


db.ROLES = ["user", "employee"];

module.exports = db;
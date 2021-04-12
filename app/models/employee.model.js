module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstname:{
        type: Sequelize.STRING
      },
      lastname:{
        type: Sequelize.STRING
      },
      organization:{
        type: Sequelize.STRING
      }
    });
  
    return Employee;
  };
  
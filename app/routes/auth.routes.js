const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/user/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/user/signin", controller.signin);
  app.post("/api/auth/employee/signin", controller.emsignin);
  app.post(
    "/api/auth/employee/signup",
    [
      verifySignUp.empcheckDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

};

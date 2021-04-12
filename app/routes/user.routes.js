const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const authRoutes = require("./auth.routes");



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user/username/:username",
    [authJwt.verifyToken, authJwt.isUser],
    controller.byUsername
  )

  app.get(
    "/api/test/user/id/:id",
    [authJwt.verifyToken, authJwt.isUser],
    controller.byID
  )

  app.get(
    "/api/test/user/mail/:mail",
    [authJwt.verifyToken, authJwt.isUser],
    controller.byMail
  )
  app.get(
    "/api/test/user/fname/:fname",
    [authJwt.verifyToken, authJwt.isUser],
    controller.byFname
  )
  app.get(
    "/api/test/user/lname/:lname",
    [authJwt.verifyToken, authJwt.isUser],
    controller.byLname
  )

  app.get(
    "/api/test/users",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );
  app.get(
    "/api/test/users?field=valA&toOrder=valB&pgLimit=valC&pgOffset=valD",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );


//

app.get(
  "/api/test/employee/username/:username",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.EbyUsername
)

app.get(
  "/api/test/employee/id/:id",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.EbyID
)

app.get(
  "/api/test/employee/mail/:mail",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.EbyMail
)
app.get(
  "/api/test/employee/fname/:fname",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.EbyFname
)
app.get(
  "/api/test/employee/lname/:lname",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.EbyLname
)

app.get(
  "/api/test/employees",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.employeeBoard
);
app.get(
  "/api/test/employees?field=valA&toOrder=valB&pgLimit=valC&pgOffset=valD",
  [authJwt.verifyToken, authJwt.isEmployee],
  controller.employeeBoard
);



  app.get(
    "/api/test/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeeBoard
  );


  
};



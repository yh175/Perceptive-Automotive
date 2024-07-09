const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Routes pour créer, supprimer et modifier un utilisateur
  app.post("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.createUser);
  app.delete("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
  app.put("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUser);

  // Route pour mettre à jour les rôles d'un utilisateur
  // app.put("/api/users/:id/roles", [authJwt.verifyToken, authJwt.isAdmin], controller.updateUserRoles);

  // Route pour récupérer tous les utilisateurs
  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);

  // Route pour récupérer un utilisateur
  app.get('/api/user/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserById);
};

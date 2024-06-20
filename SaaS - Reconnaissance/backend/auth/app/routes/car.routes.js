const controllerCar = require("../controllers/car.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/car/add",
    controllerCar.addCar
  );

  app.get("/api/car/getAll", controllerCar.getCars);

  app.put("/api/car/update/:id", controllerCar.updateCar); // Nouvelle route PUT pour la mise à jour d'une voiture

  app.get("/api/car/get/:id", controllerCar.getCar); // Nouvelle route pour récupérer une voiture par ID

  app.delete("/api/car/delete/:id", controllerCar.deleteCar); // Nouvelle route DELETE pour supprimer une voiture par ID
};
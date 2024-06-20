const db = require("../models");
const Car = db.car;


exports.addCar = (req, res) => {
    // console.log('HERE', req.body, typeof req.body)
    // Save User to Database
    console.log(req.body);
    Car.create({
        plate_number: req.body.plate_number,
        model: req.body.model,
        brand: req.body.brand,
        year: req.body.year,
        color: req.body.color,
        seating_capacity: req.body.seating_capacity,
        status: req.body.status,
    })
    .then(car => {
        res.send({ message: "Car added successfully!", car });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.getCars = (req, res) => {
    // Récupère toutes les voitures de la base de données
    Car.findAll()
    .then(cars => {
        res.send(cars);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.updateCar = (req, res) => {
    const id = req.params.id;
  
    Car.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Car with id=" + id
      });
    });
  };
  
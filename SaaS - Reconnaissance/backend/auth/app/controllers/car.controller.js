const db = require("../models");
const Car = db.car;


exports.addCar = (req, res) => {
    // console.log('HERE', req.body, typeof req.body)
    // Save User to Database
    
    // Conversion des champs en types appropriés
    const priceKilometer = parseFloat(req.body.price_kilometer); // Conversion en nombre décimal

    Car.create({
        plate_number: req.body.plate_number,
        model: req.body.model,
        brand: req.body.brand,
        year: req.body.year,
        color: req.body.color,
        seating_capacity: req.body.seating_capacity,
        status: req.body.status,
        price_kilometer: priceKilometer,
    })
    .then(car => {
        res.send({ message: "Car added successfully!", car });
    })
    .catch(err => {
        console.log(req.body);
        console.error('Error creating car:', err);
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
  
exports.getCar = (req, res) => {
    const id = req.params.id;

    Car.findByPk(id)
    .then(car => {
        if (car) {
            res.send(car);
        } else {
            res.status(404).send({
            message: `Cannot find Car with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Car with id=" + id
        });
    });
};

exports.deleteCar = (req, res) => {
    const id = req.params.id;

    Car.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Car was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Car with id=" + id
        });
    });
};
const db = require("../models");
const Reservation = db.reservation;
const User = db.user;
const Car = db.car;
const { Op } = require("sequelize");

// Créer et enregistrer une nouvelle réservation
exports.create = async (req, res) => {
  try {
    const reservation = {
      user_id: req.body.user_id,
      vehicle_id: req.body.vehicle_id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      pickup_location: req.body.pickup_location,
      dropoff_location: req.body.dropoff_location,
      total_cost: req.body.total_cost,
      payment_status: req.body.payment_status
    };

    const newReservation = await Reservation.create(reservation);
    res.status(201).send(newReservation);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Une erreur est survenue lors de la création de la réservation."
    });
  }
};

// Récupérer toutes les réservations
exports.findAll = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'email']
        },
        {
          model: Car,
          attributes: ['plate_number', 'model', 'brand']
        }
      ]
    });
    res.status(200).send(reservations);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Une erreur est survenue lors de la récupération des réservations."
    });
  }
};

// Récupérer une réservation par ID
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const reservation = await Reservation.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['username', 'email']
        },
        {
          model: Car,
          attributes: ['plate_number', 'model', 'brand']
        }
      ]
    });

    if (!reservation) {
      return res.status(404).send({
        message: `Impossible de trouver une réservation avec l'id=${id}.`
      });
    }

    res.status(200).send(reservation);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Erreur lors de la récupération de la réservation avec l'id=${id}.`
    });
  }
};

// Mettre à jour une réservation par ID
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Reservation.update(req.body, {
      where: { reservation_id: id }
    });

    if (num == 1) {
      res.status(200).send({
        message: "La réservation a été mise à jour avec succès."
      });
    } else {
      res.send({
        message: `Impossible de mettre à jour la réservation avec l'id=${id}. Peut-être que la réservation n'a pas été trouvée ou que req.body est vide!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Erreur lors de la mise à jour de la réservation avec l'id=${id}.`
    });
  }
};

// Supprimer une réservation par ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Reservation.destroy({
      where: { reservation_id: id }
    });

    if (num == 1) {
      res.status(200).send({
        message: "La réservation a été supprimée avec succès!"
      });
    } else {
      res.send({
        message: `Impossible de supprimer la réservation avec l'id=${id}. Peut-être que la réservation n'a pas été trouvée!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || `Erreur lors de la suppression de la réservation avec l'id=${id}.`
    });
  }
};

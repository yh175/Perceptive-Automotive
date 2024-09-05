const { authJwt } = require("../middleware");
const controller = require("../controllers/reservation.controller");

module.exports = function(app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Créer une nouvelle réservation
    app.post(
        "/api/reservation/create",
        [authJwt.verifyToken], 
        controller.create  // Utilisez 'create' au lieu de 'createReservation'
    );

    // Récupérer toutes les réservations d'un utilisateur authentifié
    app.get(
        "/api/reservation/user",
        [authJwt.verifyToken],  
        controller.findAll  // Utilisez 'findAll' au lieu de 'getUserReservations'
    );

    // Récupérer une réservation spécifique par son ID
    app.get(
        "/api/reservation/:reservationId",
        [authJwt.verifyToken],  
        controller.findOne  // Utilisez 'findOne' au lieu de 'getReservationById'
    );

    // Mettre à jour une réservation spécifique
    app.put(
        "/api/reservation/:reservationId",
        [authJwt.verifyToken],  
        controller.update  // Utilisez 'update' au lieu de 'updateReservation'
    );

    // Supprimer une réservation spécifique
    app.delete(
        "/api/reservation/:reservationId",
        [authJwt.verifyToken],  
        controller.delete  // Utilisez 'delete' au lieu de 'deleteReservation'
    );
};

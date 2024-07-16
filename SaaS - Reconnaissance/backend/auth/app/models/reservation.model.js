module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservations", {
      reservation_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Nom de la table des utilisateurs
          key: 'id'
        }
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cars', // Nom de la table des véhicules
          key: 'id'
        }
      },
      reservation_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pickup_location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dropoff_location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
        defaultValue: 'Pending'
      },
      total_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      payment_status: {
        type: Sequelize.ENUM('Pending', 'Paid', 'Failed'),
        defaultValue: 'Pending'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      timestamps: false // Désactive les timestamps automatiques de Sequelize
    });
  
    return Reservation;
  };
  
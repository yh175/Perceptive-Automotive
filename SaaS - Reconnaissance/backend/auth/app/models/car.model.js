module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define("cars", {
      plate_number: {
        type: Sequelize.STRING,
        allowNull: false, // La valeur ne peut pas être vide
        unique: true // La valeur doit être unique dans la table
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },    
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year: {
        type: Sequelize.INTEGER(4).UNSIGNED,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      seating_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('available','in_service','maintenance'),
        defaultValue: 'available'
      }
    });
  
    return Car;
  };
  
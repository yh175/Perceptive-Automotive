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
      location_lat: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location_lon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price_kilometer: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('available','in_service','maintenance'),
        defaultValue: 'available'
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true // Permet le stockage du nom du fichier image
      }
    });
  
    return Car;
  };
  
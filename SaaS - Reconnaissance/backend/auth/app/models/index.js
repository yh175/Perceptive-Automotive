const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.car = require("../models/car.model.js")(sequelize, Sequelize); 
db.reservation = require('../models/reservation.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["Basic User", "Moderator", "Admin"];

// Synchroniser les modèles avec la base de données
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Tables synchronized.");
}).catch(error => {
  console.error("Error synchronizing tables: ", error);
});

module.exports = db;

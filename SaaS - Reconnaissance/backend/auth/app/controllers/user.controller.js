const db = require('../models');
const User = db.user;
const Role = db.role;
const bcrypt = require('bcryptjs');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8)
    });

    if (roles) {
      const roleList = await Role.findAll({
        where: {
          name: roles
        }
      });
      await user.setRoles(roleList);
    } else {
      // Si aucun rôle n'est spécifié, attribuer le rôle par défaut 'user'
      const defaultRole = await Role.findOne({
        where: {
          name: 'Basic User'
        }
      });
      await user.setRoles([defaultRole]);
    }

    res.status(201).send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Fonction pour supprimer un utilisateur par son ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.destroy({
      where: { id }
    });

    if (user) {
      res.status(200).send({ message: "User was deleted successfully!" });
    } else {
      res.status(404).send({ message: "User not found." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Fonction pour modifier un utilisateur par son ID incluant les rôles
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, roles } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Update user information
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = bcrypt.hashSync(password, 8); // Update password if provided
    }
    await user.save();

    // Update user roles
    const rolesToSet = await Role.findAll({
      where: {
        name: roles
      }
    });

    await user.setRoles(rolesToSet);

    res.status(200).send({ message: "User and roles were updated successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Fonction pour récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          as: 'roles',
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    });

    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
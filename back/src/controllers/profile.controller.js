// src/controllers/profile.controller.js
const pool = require("../db/index");

// READ – liste de tous les users
exports.listUsers = async (req, res) => {
  try {
    // adapte les noms de colonnes si besoin
    const [rows] = await pool.query(
      "SELECT id, email, birthday, birthcity FROM users"
    );

    res.status(200).json({
      success: true,
      message: "liste des utilisateurs",
      data: rows,
    });
  } catch (err) {
    console.error("Erreur listUsers :", err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des utilisateurs",
      data: null,
    });
  }
};


// READ ONE – afficher un user par id
exports.getUsersById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [rows] = await pool.query(
      "SELECT id, email, birthday, birthcity FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "user found",
      data: rows[0],
    });
  } catch (err) {
    console.error("Erreur getUsersById :", err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'utilisateur",
      data: null,
    });
  }
};

// UPDATE – modifier un user (email / birthday / birthcity)
exports.modifyUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { email, birthday, birthcity } = req.body;

    // on récupère d'abord l'utilisateur
    const [rows] = await pool.query(
      "SELECT id, email, birthday, birthcity FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: null,
      });
    }

    const user = rows[0];

    const newEmail = email !== undefined ? email : user.email;
    const newBirthday = birthday !== undefined ? birthday : user.birthday;
    const newBirthcity = birthcity !== undefined ? birthcity : user.birthcity;

    await pool.query(
      "UPDATE users SET email = ?, birthday = ?, birthcity = ? WHERE id = ?",
      [newEmail, newBirthday, newBirthcity, id]
    );

    res.status(200).json({
      success: true,
      message: "utilisateur mis à jour",
      data: {
        id,
        email: newEmail,
        birthday: newBirthday,
        birthcity: newBirthcity,
      },
    });
  } catch (err) {
    console.error("Erreur modifyUser :", err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la modification de l'utilisateur",
      data: null,
    });
  }
};

// DELETE – supprimer un user
exports.deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "utilisateur non trouvé",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "utilisateur supprimé",
      data: { id },
    });
  } catch (err) {
    console.error("Erreur deleteUser :", err);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'utilisateur",
      data: null,
    });
  }
};

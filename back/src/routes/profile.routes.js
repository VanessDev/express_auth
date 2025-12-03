// src/routes/profile.routes.js
const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");

router.get("/", profileController.listUsers);
router.get("/:id", profileController.getUsersById);
router.put("/:id", profileController.modifyUser);
router.delete("/:id", profileController.deleteUser);

module.exports = router;

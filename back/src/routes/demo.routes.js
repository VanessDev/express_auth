// src/routes/demo.routes.js

const express = require("express");
const router = express.Router();

const {
  searchUserSafe,
  searchUserUnsafe,
} = require("../controllers/demo.controller");

router.get("/search/safe", searchUserSafe);

router.get("/search/unsafe", searchUserUnsafe);

module.exports = router;

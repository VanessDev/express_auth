const express = require("express");
const router = express.Router();

const { getAnecdote } = require("../controllers/anecdote.controller");

router.get("/", getAnecdote); 

module.exports = router;

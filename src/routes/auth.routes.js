const express = require('express');
const router = express.Router();

// import your controller (one require is enough)
const authController = require('../controllers/auth.controller');

const { authenticate } = require('../middlewares/auth.middleware');

// POST /monapi/auth/register
router.post(
  '/register',
  authController.registerController
);

// POST /monapi/auth/login
router.post(
  '/login',
  authController.loginController
);

// GET /monapi/auth/profil (if you have it)
router.get(
  '/profil',
  authenticate, authController.profileController   // or whatever name you exported
);


module.exports = router;

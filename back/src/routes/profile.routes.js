const { Router } = require("express");

const profileController = require("../controllers/profile.controller");

const router = Router();

//endpoints users

router.get("/", profileController.listUsers);
router.get("/:id", profileController.getUsersById);
router.post("/", profileController.createUser);
router.put("/:id", profileController.modifyUser);


module.exports = router;
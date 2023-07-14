const { Router } = require("express");
const router = Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const {
  postUserValidator,
  putUserValidator,
  deleteUserValidator
} = require('../middlewares')

router.get("/", getUsers);
router.post("/", [postUserValidator], createUser);
router.put("/:id", [putUserValidator], updateUser);
router.delete("/:id",[deleteUserValidator], deleteUser);

module.exports = router;

var express = require('express');
var router = express.Router();
const userController= require("../controller/userController")

/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.put('/', userController.editUser);
router.post("/auth", userController.verifyUser)
router.get('/userinfo', userController.getUserInfo);

module.exports = router;

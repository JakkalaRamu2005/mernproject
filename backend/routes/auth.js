const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../db");
const bcrypt = require("bcrypt");


const {register, login, logout} = require('../controllers/authController');
const verifyToken = require("../middleware/verifyToken");

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', verifyToken,(request, response)=>{
    response.json({message: "This is a protected route!", user: request.user})
})

module.exports = router;


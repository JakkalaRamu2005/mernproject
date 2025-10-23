const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");

const{getWishlist} = require("../controllers/wishlistController");



router.use(verifyToken);

router.get("/", getWishlist);

module.exports = router;
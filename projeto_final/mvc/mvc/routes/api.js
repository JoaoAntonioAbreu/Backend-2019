var express = require('express');
var router = express.Router();
var author_controler = require('../controllers/personController');



router.get("/person/:id", author_controler.author_detail);

module.exports = router;
const express = require ('express');
const getResponse = require('../controller/webController');
const router = express.Router();

router.get('/hello', getResponse);

module.exports = router;
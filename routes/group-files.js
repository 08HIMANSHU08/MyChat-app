const express = require('express');
const router = express.Router();

const controller = require('../controllers/files');
const authenticator = require('../middleware/auth');

router.post('/filestored/:groupId',authenticator.authenticate,controller.downloadFiles);


module.exports = router;
const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth-controller');

router.post('/', controller.login);
router.post('/forgot_password', controller.forgotPassword);
router.post('/reset_password/:token', controller.resetPassword);


module.exports = router;
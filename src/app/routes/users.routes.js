const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const middlewares = require('../middlewares/auth');

router.get('/', middlewares.isAdmin, controller.get);
router.post('/', controller.post);
router.get('/:id', middlewares.verifyToken, controller.getById);
router.put('/:id', middlewares.verifyToken, controller.put);
router.put('/updatepass/:id', middlewares.verifyToken, controller.UpdatePassword);
router.delete('/:id', middlewares.verifyToken, controller.delete);

module.exports = router;
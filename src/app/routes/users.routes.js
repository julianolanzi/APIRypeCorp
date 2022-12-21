const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const middlewares = require('../middlewares/auth');

router.get('/', middlewares.isAdmin, controller.get);
router.post('/', controller.post);
router.get('/:id', middlewares.isAdmin, controller.getById);
router.put('/:id', middlewares.isAdmin, controller.put);
router.put('/updatepass/:id', middlewares.isAdmin, controller.UpdatePassword);
router.delete('/:id', middlewares.isAdmin, controller.delete);

module.exports = router;
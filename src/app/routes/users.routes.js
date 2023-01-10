const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/auth');
const multerConfig = require('../config/multer-users');
const multer = require('multer');

const controller = require('../controllers/user-controller');


router.get('/', middlewares.isAdmin, controller.get);
router.get('/:id', middlewares.verifyToken, controller.getById);
router.get('/userkey/:key', middlewares.isAdminTeam, controller.getUsersKey);


router.post('/', controller.post);
router.post('/img/:id', middlewares.verifyToken, multer(multerConfig).single('file'), controller.postImg);

router.put('/:id', middlewares.verifyToken, controller.put);
router.put('/updatepass/:id', middlewares.verifyToken, controller.updatePassword);

router.delete('/:id', middlewares.verifyToken, controller.delete);
router.delete('/img/:id', middlewares.verifyToken, controller.deleteImg);


module.exports = router;
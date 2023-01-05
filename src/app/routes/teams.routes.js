const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/auth');

const controller = require('../controllers/teams-controller');

const multerConfig = require('../config/multer-teams');
const multer = require('multer');

router.get('/', middlewares.verifyToken, controller.get);
router.get('/:id', middlewares.verifyToken, controller.getById);
router.get('/user/:id', middlewares.verifyToken, controller.getByIdUser);
router.get('/search/:key', middlewares.verifyToken, controller.getTeamsKey);


router.post('/', controller.post);
router.post('/img/:id', middlewares.isAdminTeam, multer(multerConfig).single('file'), controller.postTeamImg);
router.post('/teampublic', middlewares.verifyToken, controller.joinTeamPublic);

router.put('/:id', middlewares.isAdminTeam, controller.putInfoTeam);
router.put('/members/:idTaem/:idMember', middlewares.isAdminTeam, controller.updateMemberTeam);
router.put('/admin/:idTaem/:idMember', middlewares.isAdminTeam, controller.updateAdminTeam);

router.delete('/members/:idTaem/:idMember', middlewares.isAdminTeam, controller.deleteMemberTeam);
router.delete('/admin/:idTaem/:idMember', middlewares.isAdminTeam, controller.deleteAdminTeam);
router.delete('/:id', middlewares.isAdminTeam, controller.delete);
router.delete('/img/:id', middlewares.isAdminTeam, controller.deleteTeamImg);
router.delete('/quit/team/:id', middlewares.verifyToken, controller.quitTeam);



module.exports = router;
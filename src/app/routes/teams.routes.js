const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/auth');

const controller = require('../controllers/teams-controller');

const multerConfig = require('../config/multer-teams');
const multer = require('multer');

router.get('/', middlewares.isAdmin, controller.get);
router.get('/:id', middlewares.verifyToken, controller.getById);
router.get('/search/:key', middlewares.verifyToken, controller.getTeamsKey);
router.get('/search/user/:id', middlewares.verifyToken, controller.getUserTeam);


router.post('/', middlewares.verifyToken, controller.post);
router.post('/img/:id', middlewares.isAdminTeam, multer(multerConfig).single('file'), controller.postTeamImg);
router.post('/teampublic', middlewares.verifyToken, controller.joinPublicTeam);


router.put('/:id', middlewares.isAdminTeam, controller.putInfoTeam);
router.put('/admin/:id', middlewares.isAdminTeam, controller.updateAdminMember);
router.put('/member/:id', middlewares.isAdminTeam, controller.updateMemberTeam);

router.put('/quit/member/:id', middlewares.isAdminTeam, controller.deleteMember);
router.put('/update/member/:id', middlewares.isAdminTeam, controller.updateRoleMember);



router.delete('/:id', middlewares.isAdminTeam, controller.delete);
router.delete('/img/:id', middlewares.isAdminTeam, controller.deleteTeamImg);
router.delete('/quit/team/:id', middlewares.verifyToken, controller.quitTeam);




module.exports = router;
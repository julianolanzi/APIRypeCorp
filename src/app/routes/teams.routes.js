const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/auth');

const controller = require('../controllers/teams-controller');


router.get('/', middlewares.verifyToken, controller.get);

router.post('/', controller.post);

router.put('/:id', middlewares.isAdminTeam, controller.putInfoTeam);
router.put('/members/:idTaem/:idMember', middlewares.isAdminTeam, controller.updateMemberTeam);
router.put('/admin/:idTaem/:idMember', middlewares.isAdminTeam, controller.updateAdminTeam);

router.delete('/members/:idTaem/:idMember', middlewares.isAdminTeam, controller.deleteMemberTeam);
router.delete('/admin/:idTaem/:idMember', middlewares.isAdminTeam, controller.deleteAdminTeam);
router.delete('/:id', middlewares.isAdminTeam, controller.delete);

module.exports = router;
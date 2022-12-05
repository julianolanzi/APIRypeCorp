const express = require('express');
const router = express.Router();
const controller = require('../controllers/teams-controller');
const middlewares = require('../middlewares/auth');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.putInfoTeam);
router.put('/members/:idTaem/:idMember', controller.updateMemberTeam);
router.put('/admin/:idTaem/:idMember', controller.updateAdminTeam);

router.delete('/members/:idTaem/:idMember', controller.deleteMemberTeam);
router.delete('/admin/:idTaem/:idMember', controller.deleteAdminTeam);

router.delete('/:id', controller.delete);


module.exports = router;
import express from 'express';
import controller from '../controllers/profile';

const router = express.Router();

router.post('/:uid/profile', controller.createProfileForUser);
router.get('/:uid/profile', controller.findProfileForUser);
router.get('/', controller.getAllProfiles);
// not used
router.get('/:pid', controller.getProfileById);
router.put('/:pid', controller.updateProfile);
// not used
router.delete('/:pid', controller.deleteProfile);

export = router;

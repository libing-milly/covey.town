import express from 'express';
import controller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

// not used
router.get('/authorized', extractJWT, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.getAllUsers);
// not used
router.delete('/:uid', controller.deleteUser);
// not used
router.put('/resetpassword/:uid', extractJWT, controller.resetPassword);
// not used
router.post('/forgetpassword', controller.forgetPassword);
router.get('/:uid', controller.getUserById);

export = router;

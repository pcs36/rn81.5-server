import express from 'express'
import userController from '../controller/user.controller.js';

const router = express.Router();
router.post('/', userController.userLogin)
router.post('/register', userController.createUser)

// router.post('/users', userController.createUser);
// router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

export default router;

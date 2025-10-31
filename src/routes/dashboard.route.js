import express from 'express'
import userController from '../controller/user.controller.js';
import dashboardController from '../controller/dashboard.controller.js';    

const router = express.Router();
router.get('/', dashboardController.getAllUserDetails)

export default router;

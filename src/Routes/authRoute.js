import express from 'express';
import AuthController from '../Controllers/authController.js';
import UserComponent from '../Components/userComponent.js';
const authController = new AuthController()
const userComponent = new UserComponent()

const authRoutes = express.Router();

authRoutes.route('/login').post(authController.login);
authRoutes.route('/callback').get(authController.processAuth, userComponent.commenceAuth)

export default authRoutes;

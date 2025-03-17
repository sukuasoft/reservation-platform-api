import { Router } from "express";
import usersController from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// Rotas do Usuário
const usersRoutes = Router();

usersRoutes.post('/auth/register',usersController.register);
usersRoutes.post('/auth/login',usersController.login);
usersRoutes.get('/me',authMiddleware,usersController.me);
usersRoutes.patch('/deposit', authMiddleware, usersController.deposit);

export default usersRoutes;
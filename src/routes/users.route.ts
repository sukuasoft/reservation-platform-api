import { Router } from "express";
import usersController from "../controllers/users.controller";

// Rotas do Usuário
const usersRoutes = Router();

usersRoutes.post('/auth/register',usersController.register);
usersRoutes.post('/auth/login',usersController.login);

export default usersRoutes;
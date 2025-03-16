import { Router } from "express";
import servicesController from "../controllers/services.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// Rotas do Usuário
const servicesRoutes = Router();

servicesRoutes.post('/services',authMiddleware,servicesController.create);
servicesRoutes.get('/services',authMiddleware, servicesController.getAll);
servicesRoutes.get('/services/:id',authMiddleware, servicesController.get);
servicesRoutes.put('/services/:id',authMiddleware, servicesController.update);
servicesRoutes.delete('/services/:id',authMiddleware, servicesController.destroy);

export default servicesRoutes;
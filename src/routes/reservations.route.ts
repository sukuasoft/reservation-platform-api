import { Router } from "express";
import reservationsController from "../controllers/reservations.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

// Rotas das Reservas
const reservationsRoutes = Router();

reservationsRoutes.post('/reservations',authMiddleware,reservationsController.create);
reservationsRoutes.get('/reservations',authMiddleware, reservationsController.getAll);
reservationsRoutes.get('/reservations/:id',authMiddleware, reservationsController.get);
reservationsRoutes.patch('/reservations/:id/cancel',authMiddleware, reservationsController.cancel);

export default reservationsRoutes;
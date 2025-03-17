import { Express, Request, Response } from "express";
import usersRoutes from "./users.route";
import servicesRoutes from "./services.route";
import reservationsRoutes from "./reservations.route";

// adicionar todas a rotas do projecto
export function initRoutes (app:Express){

    app.get('/', (request:Request, response:Response)=> {
        response.json({
            message: 'API running...'
        })
    })

    //rotas do usuário
    app.use(usersRoutes);

    //rotas dos serviços
    app.use(servicesRoutes);

    // Rotas das Reservas
    app.use(reservationsRoutes);

}
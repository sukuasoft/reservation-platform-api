import { Express } from "express";
import usersRoutes from "./users.route";

// adicionar todas a rotas do projecto
export function initRoutes (app:Express){
    
    //rotas do usuário
    app.use(usersRoutes);
}
import express from 'express';
import { envConfig } from './config/env';
import { initRoutes } from './routes/app.route';
import cors from 'cors';

//instanciar o express
const app = express();

// habilitar requisições com Content-Type: application/json
app.use(express.json())

//habilitar cors
app.use(cors());

//inicializar as rotas
initRoutes(app);


// iniciar a escuta na porta especifícada
app.listen(envConfig.PORT, ()=>{
    console.log(`Servidor rodando na porta ${envConfig.PORT}`)
})
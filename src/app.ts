import express from 'express';
import { envConfig } from './config/env';
import { initRoutes } from './routes/app.route';
import cors from 'cors';
import rateLimit from 'express-rate-limit';



//instanciar o express
const app = express();

// habilitar requisições com Content-Type: application/json
app.use(express.json())

//habilitar cors
app.use(cors());

/*

//limitar requisições de um usuário para evitar DDos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 requisições por IP
    message: "Muitas requisições. Tente novamente mais tarde."
});

app.use(limiter);*/

//inicializar as rotas
initRoutes(app);


// iniciar a escuta na porta especifícada
app.listen(envConfig.PORT, () => {
    console.log(`Servidor rodando na porta ${envConfig.PORT}`)
})
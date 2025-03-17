# Reservation Platform API

## Descrição
API desenvolvida para a plataforma de reservas, permitindo gerenciamento de usuários, serviços e reservas.

## Tecnologias Utilizadas
- **Node.js**
- **Typescript**
- **Express.js**
- **Prisma ORM**
- **Docker**
- **JWT para autenticação**
- **Zod para validação de dados**

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/sukuasoft/reservation-platform-api.git
   cd reservation-platform-api
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Crie um arquivo `.env` e configure as variáveis de ambiente:
   ```env
    DATABASE_URL="seu_db_file"
    APP_KEY=seu_app_key # usado como JWT Secret
    PORT=3000
    ENV_MODE=development # development | production 
   ```

4. Execute as migrações do banco de dados:
   ```sh
   npm run prisma:migrate
   npm run prisma:generate

   ```

## Execução

### Modo de Desenvolvimento:
```sh
npm run dev
```

### Build e Produção:
```sh
npm run build
npm start
```


## 📌 Documentação dos Endpoints

Para visualizar e testar os endpoints, importe a coleção do Postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/eco-clean/bulir-teste/collection/i7aloxk/reserve-platform-api?action=share&source=copy-link&creator=33040225)
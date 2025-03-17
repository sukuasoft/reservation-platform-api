FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run prisma:migrate
RUN npm run prisma:generate

EXPOSE 3000

CMD ["npm", "start"]

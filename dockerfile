FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

ENV NODE_ENV=production

# Comando para iniciar la aplicación
# CMD ["npm", "run", "dev"]
# Comando para iniciar el consumer de RabbitMQ
CMD ["node", "src/receive.js"]

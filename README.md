# README

## Como correr la prueba
1. en el docker-compose.yml solo debe estar rabbit auth y notifications
2. cambiar DB_HOST=db en auth
3. agrega un db en docker-compose image: mysql:8 y mas datos para la db
4. aqui en notifications docker-compose up --build
5. abrir la terminal en receive y ejecutar node receive.js
ahora debe estarse esperando un mensaje... (se puede ver en rabbit)
6. abrir la terminal de auth y docker-compose up --build
7. en auth/src ejecutar publishUser.js { email: 'prueba3@gmail.com', name: 'Gaby' } (se puede ver en rabbit)
ahora debe haber se enviado un mensaje a la cola

## Explicacion de prueba funcionamiento de notificaciones + rabbitmq y auth 

### Send
Envia un mensaje a la cola usuario_registrado 
channel.sendToQueue(queue, Buffer.from(msg));
Los mensajes luego los enviara auth 

### Receive
Consume mensajes de la cola usuario_registrado
channel.consume(queue, async (msg) => { ... });
Este conusmidor si sera el original y unico, que trata las "peticiones" entre servicios

Se debe correr en docker notificaciones para que tambien trbaje rabbit, por eso el docker file dice 
CMD ["node", "src/receive.js"]
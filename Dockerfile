# On utilise la version 20-alpine3.17 de l'image Node 
FROM node:20-alpine3.17 as node

#On utilise un user n'ayant pas les permissions root 
USER node  

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .
#On lance l'application
CMD ["npm", "start"]

FROM node:20-alpine3.17 as build

#On utilise un user n'ayant pas les permissions root 
USER node  

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .
#On lance l'application
CMD ["npm", "build"]

FROM node:20-alpine3.17 as production

#On utilise un user n'ayant pas les permissions root 
USER node  

WORKDIR /app

COPY --from=build 

RUN npm i

COPY . .
#On lance l'application
CMD ["npm", "build"]
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src

EXPOSE 3001

USER node

CMD ["node", "src/app.js"]
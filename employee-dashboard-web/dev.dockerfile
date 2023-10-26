FROM node:18-alpine

WORKDIR /frontend

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
FROM node:14-alpine

WORKDIR /app

COPY package.json ./

# RUN npm install
RUN npm install -g typescript nodemon ts-node prettier

COPY . .

# RUN npm run build

#EXPOSE 3000

#CMD ["npm","run","test"]

CMD ["nodemon","source/server.ts"]

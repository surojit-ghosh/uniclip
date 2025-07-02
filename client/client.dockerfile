FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ARG NEXT_PUBLIC_SERVER_URL=https://uniclip-server.surojit.in
ENV NEXT_PUBLIC_SERVER_URL=https://uniclip-server.surojit.in

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
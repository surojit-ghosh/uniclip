FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
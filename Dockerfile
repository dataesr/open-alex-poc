FROM node:18-alpine
WORKDIR /app
COPY server ./
COPY package-lock.json .
RUN npm ci
EXPOSE 3000
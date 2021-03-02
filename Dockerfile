FROM node:12-alpine
WORKDIR /app
COPY . .
EXPOSE 3000/tcp
RUN npm install
CMD ["npm", "start"]
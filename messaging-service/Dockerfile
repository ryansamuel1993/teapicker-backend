FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma (if used)
RUN npx prisma generate

EXPOSE 4000
CMD ["npm", "run", "start"]

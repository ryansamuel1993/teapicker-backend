FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma setup
RUN npx prisma generate

# Expose GraphQL API
EXPOSE 4000

CMD ["npm", "run", "start"]

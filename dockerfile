# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Genera Prisma Client en entorno Linux
RUN npx prisma generate
# RUN npx prisma migrate deploy
RUN npm run build

# Etapa de producción
FROM node:18-alpine
WORKDIR /app

# Copia solo lo necesario

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

CMD ["node", "dist/src/main"]
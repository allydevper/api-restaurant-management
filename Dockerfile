# Usa una imagen más ligera para producción
ARG NODE_VERSION=18.12.1
FROM node:${NODE_VERSION}-slim AS build

LABEL fly_launch_runtime="NestJS"

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de producción
RUN npm ci

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen más ligera para producción
FROM base

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo las dependencias de producción desde la etapa de construcción
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

# Expone el puerto en el que corre tu aplicación (ajusta si es necesario)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main.js"]

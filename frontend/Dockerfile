# Utilise une image de base légère
FROM node:18-alpine

# Crée le dossier de travail
WORKDIR /app

# Copie les fichiers dans /app/public
COPY ./public ./public

# Installe express pour servir les fichiers
RUN npm install express

# Copie le serveur express
COPY server.js .

# Lance le serveur
CMD ["node", "server.js"]

# Multi-stage Dockerfile for INPRINT Platform

# Stage 1: Build the React + Vite Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final Production Server (Nginx + Express Backend)
FROM node:20-alpine
WORKDIR /app

# Install Nginx and Supervisor
RUN apk update && apk add --no-cache nginx supervisor

# Setup Backend Server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production
COPY server/ ./

# Copy built frontend to Nginx html directory
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Copy Nginx Configuration
RUN mkdir -p /etc/nginx/http.d
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://127.0.0.1:4000/api/; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
        proxy_set_header Host $host; \
    } \
}' > /etc/nginx/http.d/default.conf

# Supervisord configuration to run both Nginx and Node Express
RUN echo '[supervisord]' > /etc/supervisord.conf && \
    echo 'nodaemon=true' >> /etc/supervisord.conf && \
    echo '[program:nginx]' >> /etc/supervisord.conf && \
    echo 'command=nginx -g "daemon off;"' >> /etc/supervisord.conf && \
    echo '[program:node-api]' >> /etc/supervisord.conf && \
    echo 'directory=/app/server' >> /etc/supervisord.conf && \
    echo 'command=node server.js' >> /etc/supervisord.conf

EXPOSE 80 4000
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

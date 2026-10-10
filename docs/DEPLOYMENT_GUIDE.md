# INPRINT Production Deployment Guide

This guide describes how to deploy the full-stack INPRINT platform to production environments (Docker, Vercel, VPS/Nginx).

---

## 1. Docker Deployment (Recommended)

The repository includes a multi-stage `Dockerfile` and `docker-compose.yml`.

### Quickstart with Docker Compose:
```bash
# Clone and enter repo
git clone https://github.com/woodex-int/surah-yaseen.git inprint-platform
cd inprint-platform

# Launch frontend, backend API, and Postgres
docker-compose up -d --build

# Verify running services
docker-compose ps
```

* **Frontend:** `http://localhost:80`
* **Backend API:** `http://localhost:4000/api/v1`
* **PostgreSQL:** `localhost:5432`

---

## 2. Manual Linux VPS / Nginx Deployment (Ubuntu / Debian)

### Step 1: Install Node.js & Dependencies
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git
```

### Step 2: Build Frontend
```bash
git clone https://github.com/woodex-int/surah-yaseen.git /var/www/inprint
cd /var/www/inprint
npm install
npm run build
```

### Step 3: Run Backend API with PM2
```bash
sudo npm install -g pm2
cd /var/www/inprint/server
npm install
pm2 start server.js --name "inprint-api"
pm2 startup
pm2 save
```

### Step 4: Configure Nginx Reverse Proxy
Create `/etc/nginx/sites-available/inprint`:

```nginx
server {
    listen 80;
    server_name inprint.pk www.inprint.pk;

    # Static Frontend
    location / {
        root /var/www/inprint/dist;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/inprint /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL Certificate with Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d inprint.pk -d www.inprint.pk
```

---

## 3. Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=production
PORT=4000
VITE_API_URL=https://inprint.pk/api/v1
DATABASE_URL=postgresql://postgres:password@localhost:5432/inprint_db
```

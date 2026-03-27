# React Starter Kit

Laravel + React project with Docker, MySQL, Redis, Nginx, and Vite.

## Run Project

### 1. Start containers

```bash
docker compose up -d --build
```

### 2. Install PHP dependencies

```bash
docker compose exec app composer install
```

### 3. Create environment file

```bash
cp .env.example .env
```

### 4. Generate application key

```bash
docker compose exec app php artisan key:generate
```

### 5. Run migrations

```bash
docker compose exec app php artisan migrate
```

### 6. Seed database

```bash
docker compose exec app php artisan db:seed
```

### 7. Install frontend dependencies

```bash
npm install
```

### 8. Build frontend

```bash
npm run build
```

## Live Demo
http://5.45.112.76:8042/

## Services

- Application: `http://localhost:8042`
- phpMyAdmin: `http://localhost:8045`

# Scheduling application

This is a web application built with [Laravel](http://laravel.com) 10.x, React + TypeScript + InertiaJS, Tailwind CSS.

## Setup 

1. Clone the repository
2. Install php dependecies

```console
> composer install
```
3. Install front-end dependecies

```console
> npm install
```

4. Copy the `.env.example` file and rename it `.env`
5. Run the command `php artisan key:generate` to generate a fresh app key
6. Set up database credentials in `.env` :

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=planning-app
DB_USERNAME=root
DB_PASSWORD=
```

6. Run a dev server with `php artisan serve` or use Apache.
7. Run `npm run dev` or `npm run build` to set up front-end assets
8. Ready to use
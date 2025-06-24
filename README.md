
# Multi-Vendor E-commerce & Reservation System

This project is mainly for educational purposes. Created using Laravel 12 React Starter Pack.


## Installation

Clone the repository
```bash
  git clone https://github.com/alimaatin/laravel-e-commerce
  cd laravel-e-commerce
```
Install all the dependencies
```bash
composer install
npm install
```
Copy the example env file and make the required configuration changes in the .env file
```bash
cp .env.example .env
```
Generate a new application key
```bash
php artisan key:generate
```
Create storage link for file uploads
```bash
php artisan storage:link
```
Run the database migrations
```bash
php artisan migrate
```
Start the local development server
```bash
composer run dev
```
Seed the database(optional)
```bash
php artisan db:seed
```
## Docker

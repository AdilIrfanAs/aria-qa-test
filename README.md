# Dcentric Health Dashboard

## Tech stacks
- [Node version 14](https://nodejs.org/en/blog/release/v14.17.3/)
- [React](https://reactjs.org/) for front-end framework
- [Recoil](https://recoiljs.org/) for state management
- [Tailwind](https://tailwindcss.com/) for front-end styling
- [React Query](https://tanstack.com/query) for data fetching
- [MySQL](https://www.mysql.com/)
- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/) for API documentation

## System Diagram
![System Diagram](/docs/system-diagram.png)

## Simple Demo
![Demo](/docs/demo.gif)

## Pages
- Sign in page
- Authenticated page
- Create new issue page
- Issue list page

## Endpoints
- `GET /`: index endpoint for health check
- `GET /docs`: swagger api documentation
- `POST /auth/sign-up`: to register new user
- `POST /auth/sign-in`: to log-in as a user
- `GET /auth/profile`: to demonstrate the JWT endpoint guard 
- `POST /issue`: to create new issue 
- `GET /issue`: to get issue list
- `GET /issue/statistics`: to get issue aggregates in daily basis

## Quickstart
```
docker-compose -f docker-compose.dev.yaml up --build
```

## How to seed the database
```
cd api
cp env.sample .env
npm install
npm run seed
```

## How to run unit tests
```
cd api
npm run test
```

## Seeded user
```
email: admin@admin.com
password: admin
```

## How to create a new user
```
curl -X 'POST' \
  'http://0.0.0.0:8000/auth/sign-up' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "admin",
  "email": "admin@admin.com",
  "password": "admin"
}'
```
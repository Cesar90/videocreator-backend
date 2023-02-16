# Video Creator Backend

This project is a “Videos Creator Platform” , where
new video creators can upload (video URL) new videos, sign up, list the available videos and video creators. You’ll have the ability to like videos and follow other video creators.

## Requirements

- Docker (optional)
- Node >= 14.0.0
- Postgres (v14.1 is recommend in your computer)

### Node Consideration

- Node >= 14.0.0

## Running

1. Create .env file and to add the following Environment Variables

```
    DATABASE_URL=""
    JWT_ACCOUNT_ACTIVATION=""
    JWT_RESET_PASSWORD=""
    JWT_SECRET=""
    PORT=""

    Note: If you have problem to run the database, create another .env inside of prisma folder cut and paste the Environment Variables for DATABASE_URL and try again
```

2. Install dependencies

```
    npm run seed
```

3. To turn on the database run the following docker command: docker-compose up -d

```
    Exmaple of database url could be: DATABASE_URL="postgres://prisma:prisma@localhost:6500/prismadb"
```

4. To create tables inside database run the following command: `npx prisma migrate dev` or `npx prisma migrate dev --name init`
5. To generarate model inside the code run: `npx prisma generate`
6. Run seeding

```
    npm run seed
```

7. To run the project in mode dev run the following command: `npm run dev`

## Structure

Typical MVC.

- prisma/ - Contains migrations and schema databse or model
- src/ - Main folder of project
- src/controllers/ - Handle logic and resolve responses
- src/database/ - Create only one prisma instance for perform queries
- src/middleware/ - Handle token access
- src/routes/ - Create routes for API Endpoint
- src/schema/ - For api docs, swagger in this case
- src/services/ - Handle logic to play with database
- src/temp/ - Handle logic to seed the database
- src/utils/ - Some important libs and types for typescript in this case
- src/validators/ - Middleware validate incoming data

import express, { Application } from 'express';
import { authRouter, userRouter, videoRouter } from './routes';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import prisma from './database/prismaClient';
import swaggerDocs from "./utils/swagger";

require('dotenv').config();
const PORT = (process.env.PORT || 3000) as number;

async function main(app: Application) {
  // options for cors middleware
  const options: cors.CorsOptions = {
    origin: process.env.CLIENT_URL
  };

  // //app middlewares
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(cors(options));

  app.use('/api', authRouter);
  app.use('/api', userRouter);
  app.use('/api', videoRouter);

  app.listen(PORT, async () => {
    swaggerDocs(app);
  });
  console.log(`[app]:http://localhost:${PORT}`);
}

main(express())
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

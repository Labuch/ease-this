import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const cookieSession = require('cookie-session');

export const setUpApp = (app: any) => {
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.use(
    cookieSession({
      keys: ['bckzh3lqe8lqker365n'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};

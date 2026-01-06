import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

const server = express();
let app;

async function createNestServer() {
  if (!app) {
    app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.enableCors({
      origin: '*',
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.setGlobalPrefix('api');

    await app.init();
  }

  return server;
}

// Handler para Vercel
export default async (req, res) => {
  const server = await createNestServer();
  return server(req, res);
};

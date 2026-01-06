// api/index.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    console.log('🚀 Inicializando NestJS para Vercel...');
    
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    
    app.enableCors({
      origin: '*',
      credentials: true,
    });
    
    app.setGlobalPrefix('api');
    
    await app.init();
    
    cachedApp = app.getHttpAdapter().getInstance();
    console.log('✅ Aplicación lista');
  }
  
  return cachedApp;
}

export default async function handler(req: any, res: any) {
  try {
    const app = await bootstrap();
    app(req, res);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
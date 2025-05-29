import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const title = 'BackEnd Fusion';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('Documentation for BackEnd Fusion API')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .addTag('Auth')
    .addTag('User')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerUiEnabled: true,
    customSiteTitle: title,
    yamlDocumentUrl: 'docs/api.yaml',
    explorer: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

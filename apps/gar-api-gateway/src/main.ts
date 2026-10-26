import { NestFactory } from '@nestjs/core';
import { GarApiGatewayModule } from './gar-api-gateway.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GarApiGatewayModule);
  const port = process.env.FRONTEND_PORT || '3030';

  app.enableCors({
    origin: `http://localhost:${port}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
  .setTitle('GardenGenius API')
  .setDescription('GardenGenius API description')
  .setVersion('0.1')
  .build()

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || '3000');
}
config();
bootstrap();

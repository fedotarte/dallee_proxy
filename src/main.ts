import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['warn', 'error', 'verbose', 'debug'],
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('dalee-proxy')
    .setDescription('dalee proxy api')
    .setVersion('0.0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, swaggerDocument);
  const APP_PORT = Number(process.env.APP_PORT) ?? 4000;
  await app.listen(APP_PORT, () => {
    console.log(`listening on port ${APP_PORT}`);
  });
}
bootstrap();

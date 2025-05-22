import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import CustomExceptionFilter from './helpers/ExceptionFilters';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: '*' });
  app.set('query-parser', 'extended'); // For complex query over route
  app.useGlobalPipes(new ValidationPipe()); // For DTO validation
  app.useGlobalFilters(new CustomExceptionFilter());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Tracking System API')
    .setDescription('Tracking System API')
    .setVersion('1.0')
    // .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);
  const server = await app.listen(process.env.PORT ?? 3000);
  server.on('error', onError);
  console.log(`Server is running over ${process.env.PORT ?? 3000} port.`);
}
const onError = (error: any) => {
  if (error.code == 'EADDRINUSE') {
    console.log('Address is in use');
    process.exit(0);
  } else {
    console.error(error);
    process.exit(1);
  }
};
void bootstrap();

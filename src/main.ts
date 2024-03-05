import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalInterceptors(
  //   // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
  //   // https://github.com/typestack/class-transformer/issues/549
  //   new ResolvePromisesInterceptor(),
  //   new ClassSerializerInterceptor(app.get(Reflector)),
  // );

  const config = new DocumentBuilder()
    .setTitle('Webchat API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  Logger.log('Server started on http://localhost:3000', 'Bootstrap');
}

bootstrap();

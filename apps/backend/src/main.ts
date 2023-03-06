import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const primsaService = app.get(PrismaService);
  await primsaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ZodValidationPipe());

  app.enableCors({ allowedHeaders: '*' });

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('SMS API')
    .setVersion('1.0')
    .build();

  patchNestJsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

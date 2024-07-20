import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2'); //  este metodo sirve para agregar un prefijo a todas las rutas
  app.useGlobalPipes(  // este metodo sirve para agregar un pipe global
    new ValidationPipe({  // este metodo sirve para agregar un pipe global
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // este metodo sirve para Modificar los datos de entrada a los tipos de datos especificados
       transformOptions: {
        enableImplicitConversion: true
       }
    }),
  ); // este metodo sirve para agregar un pipe global
  await app.listen(process.
    env.PORT 
  );
}
bootstrap();

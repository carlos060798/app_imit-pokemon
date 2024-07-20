import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguracion } from './config/app.config';
import { joiValidationShema } from './config/joi-validation';



@Module({
  imports: [
    ConfigModule.forRoot(  //  este modulo sirve para cargar las variables de entorno
      {
        load:[
          EnvConfiguracion //  este archivo contiene las variables de entorno
        ],
        validationSchema: joiValidationShema, // este archivo contiene las validaciones de las variables de entorno
      }
    ),
    ServeStaticModule.forRoot({ //  este modulo sirve para servir archivos estaticos
      rootPath: join(__dirname, '../public')
    }),
    MongooseModule.forRoot(
      process.env.URL_MONGODB
    ),//('mongodb://localhost:27017/pokemon'),  conexion de base de datos a mongodb
    PokemonModule, CommonModule, SeedModule
  ],

})
export class AppModule {



}

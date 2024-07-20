import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  imports: [
    PokemonModule, //  este modulo sirve para servir archivos del modulo para crear la incsecion ha base sde datos de la 
    // coleccion de pokemon  traidos desde la api de pokemon y guardarlos
    CommonModule
  ],

  providers: [SeedService,
  
  ],
})
export class SeedModule {}

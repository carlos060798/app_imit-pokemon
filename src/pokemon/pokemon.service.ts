import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
   private  defoultlimite: number ;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,

    private readonly  configService: ConfigService
  
  ) { 
      this.defoultlimite = this.configService.get('DEFAULT_LIMIT')
  }
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
    try{
    const Pokemon = await this.pokemonModel.create(createPokemonDto);
    return Pokemon;
    } catch (error) {
      this.handleError(error);
    }


  }

  findAll(paginationDto:PaginationDto) { //paginationDto:PaginationDto
    console.log(paginationDto)
    const { limit= this.defoultlimite ,offset=0} = paginationDto;
    console.log(limit,offset)
    return this.pokemonModel.find().limit(limit).skip(offset).sort( 
      {no: 1}
    ).select('-__v');
  }

  async findOne(term: string) {
   let Pokemon:Pokemon;

    if(!isNaN(+term)) { 
      Pokemon = await this.pokemonModel.findOne({no: term});

    }

    // validar id 

    if (isMongoId(term)) {
      Pokemon = await this.pokemonModel.findById(term);
    } else{
      Pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }


    if (!Pokemon)  throw new NotFoundException( `Pokemon with term ${term} not found`);



    return Pokemon
  
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
   
    const  pokemon = await this.findOne(term); 

    if (updatePokemonDto.name) 
    updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
 try{
     await pokemon.updateOne(updatePokemonDto )
    
    
    return { ...pokemon.toJSON(), ...updatePokemonDto}
 } catch (err) {
    this.handleError(err);
  }
}

  async remove(id: string) {
   
    const pokemon = await this.pokemonModel.deleteOne({_id: id});
    if (pokemon.deletedCount === 0) throw new NotFoundException(`Pokemon with id ${id} not found`);
    return pokemon;

    
  }


  private handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Pokemon with that name or no already exists');
    } else {
      throw new InternalServerErrorException();
    }
  }
}

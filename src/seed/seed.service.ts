import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interface/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

//private readonly  axios: AxiosInstance = axios  // usando sin un adaptador axios

constructor(
   @InjectModel('Pokemon') private readonly pokemonModel: Model<Pokemon>,
   private readonly httpp:AxiosAdapter

) {}
  
getprueba(){
  return 'hola'

}

async injectDateSeed() { // este metodo se encarga de traer los datos de la api de pokemon y guardarlos en la base de datos
   
   await this.pokemonModel.deleteMany({}) // borramos todos los datos de la base de datos
   const data= await this.httpp.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=151')

   const  pokemonToInsert: {name: string, no: number}[] = []   // creamos un array para guardar los datos de la api de pokemon




   data.results.forEach(async ({name,url}) => {  // recorremos los datos traidos de la api de pokemon y los guardamos en un array para insertarlos en la base de datos
       const  segments = url.split('/')  // dividimos la url en segmentos
        const no =+ segments[segments.length -2]  // obtenemos el numero de pokemon

        pokemonToInsert.push({name, no}) // guardamos el nombre y el numero de pokemon en el array

   })

   await this.pokemonModel.insertMany(pokemonToInsert)  // insertamos los datos en la base de datos

    return  'pokemon inserted'


   }
}

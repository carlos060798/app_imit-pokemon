/* esto representa la entidad de pokemon, que es la estructura de la tabla de pokemon en la base de datos */
import  { Document } from 'mongoose';
import { Schema, SchemaFactory,Prop } from '@nestjs/mongoose';
 @Schema()
export class Pokemon extends Document {

    //ID del pokemon
     @Prop({
        unique: true,
        Index: true
     })
    name: string;
    @Prop({
        unique: true,
        index: true
    })
    no: number;
}


export const Pokemonshema = SchemaFactory.createForClass(Pokemon);
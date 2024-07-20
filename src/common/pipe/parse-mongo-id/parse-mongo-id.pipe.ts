import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
// los pipes son clases decoradas con @Injectable() que implementan la interfaz PipeTransform  que  transforma los datos de entrada antes de que lleguen a los controladores
// la clase ParseMongoIdPipe implementa la interfaz PipeTransform
@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    return value;
  }
}

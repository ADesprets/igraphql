import {Entity, model, property, hasMany} from '@loopback/repository';
import {Country} from './country.model';

@model()
export class Continent extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Country)
  countries: Country[];

  constructor(data?: Partial<Continent>) {
    super(data);
  }
}

export interface ContinentRelations {
  // describe navigational properties here
}

export type ContinentWithRelations = Continent & ContinentRelations;

import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Continent} from './continent.model';

@model()
export class Country extends Entity {
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

  @belongsTo(() => Continent)
  continentId: string;

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;

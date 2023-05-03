import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Continent,
  Country,
} from '../models';
import {ContinentRepository} from '../repositories';

export class ContinentCountryController {
  constructor(
    @repository(ContinentRepository) protected continentRepository: ContinentRepository,
  ) { }

  @get('/continents/{id}/countries', {
    responses: {
      '200': {
        description: 'Array of Continent has many Country',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Country>,
  ): Promise<Country[]> {
    return this.continentRepository.countries(id).find(filter);
  }

  @post('/continents/{id}/countries', {
    responses: {
      '200': {
        description: 'Continent model instance',
        content: {'application/json': {schema: getModelSchemaRef(Country)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Continent.prototype.code,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {
            title: 'NewCountryInContinent',
            exclude: ['code'],
            optional: ['continentId']
          }),
        },
      },
    }) country: Omit<Country, 'code'>,
  ): Promise<Country> {
    return this.continentRepository.countries(id).create(country);
  }

  @patch('/continents/{id}/countries', {
    responses: {
      '200': {
        description: 'Continent.Country PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Country, {partial: true}),
        },
      },
    })
    country: Partial<Country>,
    @param.query.object('where', getWhereSchemaFor(Country)) where?: Where<Country>,
  ): Promise<Count> {
    return this.continentRepository.countries(id).patch(country, where);
  }

  @del('/continents/{id}/countries', {
    responses: {
      '200': {
        description: 'Continent.Country DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Country)) where?: Where<Country>,
  ): Promise<Count> {
    return this.continentRepository.countries(id).delete(where);
  }
}

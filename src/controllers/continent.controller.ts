import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Continent} from '../models';
import {ContinentRepository} from '../repositories';

export class ContinentController {
  constructor(
    @repository(ContinentRepository)
    public continentRepository : ContinentRepository,
  ) {}

  @post('/continents')
  @response(200, {
    description: 'Continent model instance',
    content: {'application/json': {schema: getModelSchemaRef(Continent)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Continent, {
            title: 'NewContinent',
            
          }),
        },
      },
    })
    continent: Continent,
  ): Promise<Continent> {
    return this.continentRepository.create(continent);
  }

  @get('/continents/count')
  @response(200, {
    description: 'Continent model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Continent) where?: Where<Continent>,
  ): Promise<Count> {
    return this.continentRepository.count(where);
  }

  @get('/continents')
  @response(200, {
    description: 'Array of Continent model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Continent, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Continent) filter?: Filter<Continent>,
  ): Promise<Continent[]> {
    return this.continentRepository.find(filter);
  }

  @patch('/continents')
  @response(200, {
    description: 'Continent PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Continent, {partial: true}),
        },
      },
    })
    continent: Continent,
    @param.where(Continent) where?: Where<Continent>,
  ): Promise<Count> {
    return this.continentRepository.updateAll(continent, where);
  }

  @get('/continents/{id}')
  @response(200, {
    description: 'Continent model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Continent, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Continent, {exclude: 'where'}) filter?: FilterExcludingWhere<Continent>
  ): Promise<Continent> {
    return this.continentRepository.findById(id, filter);
  }

  @patch('/continents/{id}')
  @response(204, {
    description: 'Continent PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Continent, {partial: true}),
        },
      },
    })
    continent: Continent,
  ): Promise<void> {
    await this.continentRepository.updateById(id, continent);
  }

  @put('/continents/{id}')
  @response(204, {
    description: 'Continent PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() continent: Continent,
  ): Promise<void> {
    await this.continentRepository.replaceById(id, continent);
  }

  @del('/continents/{id}')
  @response(204, {
    description: 'Continent DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.continentRepository.deleteById(id);
  }
}

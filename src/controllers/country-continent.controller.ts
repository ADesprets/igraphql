import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Country,
  Continent,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryContinentController {
  constructor(
    @repository(CountryRepository)
    public countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/continent', {
    responses: {
      '200': {
        description: 'Continent belonging to Country',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Continent),
          },
        },
      },
    },
  })
  async getContinent(
    @param.path.string('id') id: typeof Country.prototype.code,
  ): Promise<Continent> {
    return this.countryRepository.continent(id);
  }
}

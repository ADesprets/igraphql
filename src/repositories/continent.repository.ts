import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CountriesDataSource} from '../datasources';
import {Continent, ContinentRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class ContinentRepository extends DefaultCrudRepository<
  Continent,
  typeof Continent.prototype.code,
  ContinentRelations
> {

  public readonly countries: HasManyRepositoryFactory<Country, typeof Continent.prototype.code>;

  constructor(
    @inject('datasources.countries') dataSource: CountriesDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(Continent, dataSource);
    this.countries = this.createHasManyRepositoryFactoryFor('countries', countryRepositoryGetter,);
    this.registerInclusionResolver('countries', this.countries.inclusionResolver);
  }
}

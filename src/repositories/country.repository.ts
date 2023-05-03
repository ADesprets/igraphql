import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {CountriesDataSource} from '../datasources';
import {Country, CountryRelations, Continent} from '../models';
import {ContinentRepository} from './continent.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.code,
  CountryRelations
> {

  public readonly continent: BelongsToAccessor<Continent, typeof Country.prototype.code>;

  constructor(
    @inject('datasources.countries') dataSource: CountriesDataSource, @repository.getter('ContinentRepository') protected continentRepositoryGetter: Getter<ContinentRepository>,
  ) {
    super(Country, dataSource);
    this.continent = this.createBelongsToAccessorFor('continent', continentRepositoryGetter,);
    this.registerInclusionResolver('continent', this.continent.inclusionResolver);
  }
}

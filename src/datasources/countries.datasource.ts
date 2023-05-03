import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'countries',
  connector: 'mongodb',
  url: 'mongodb://localhost:27017/countries',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'countries',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CountriesDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'countries';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.countries', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

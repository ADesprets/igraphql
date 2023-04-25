import {DefaultCrudRepository} from '@loopback/repository';
import {Product, ProductRelations} from '../models';
import {LocalMongoTestDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.reference,
  ProductRelations
> {
  constructor(
    @inject('datasources.local_mongo_test') dataSource: LocalMongoTestDataSource,
  ) {
    super(Product, dataSource);
  }
}

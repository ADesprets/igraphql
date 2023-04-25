import {Entity, model, property} from '@loopback/repository';

@model()
export class Test1 extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Test1>) {
    super(data);
  }
}

export interface Test1Relations {
  // describe navigational properties here
}

export type Test1WithRelations = Test1 & Test1Relations;

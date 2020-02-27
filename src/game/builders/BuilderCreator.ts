import { Builder } from './Builder';
import { Producable } from './Builder';
import { BuilderType } from '../types';
import EntityBuilder from './EntityBuilder';

class BuilderCreator {
  createBuilder(type: string): Builder<Producable> {
    switch (type) {
      case BuilderType.EntityBuilder:
        return new EntityBuilder();
      default:
        return {} as Builder<Producable>;
    }
  }
}

export default BuilderCreator;

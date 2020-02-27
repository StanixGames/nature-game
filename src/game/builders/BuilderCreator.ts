import { Builder } from './Builder';
// import { Producable } from './Builder';
import Entity from '../entities/Entity';
import { BuilderType } from '../types';
import EntityBuilder from './EntityBuilder';

class BuilderCreator {
  createBuilder(type: string): Builder<Entity> {
    switch (type) {
      case BuilderType.EntityBuilder:
        return new EntityBuilder();
      default:
        return {} as Builder<Entity>;
    }
  }
}

export default BuilderCreator;

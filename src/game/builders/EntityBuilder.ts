import Entity from '../entities/Entity';
import AntEntity from '../entities/AntEntity';
import { Builder } from './Builder';
import { EntityType } from '../types';
import EnemyEntity from '../entities/EnemyEntity';

class EntityBuilder extends Builder<Entity> {

  constructor() {
    super();
  }

  create(type: EntityType) {
    this.type = type;
    return this;
  }

  build(): Entity {
    switch (this.type) {
      case EntityType.Ant:
        return new AntEntity();
      case EntityType.Enemy:
        return new EnemyEntity();
      default:
        throw new Error('Invalid entity type!');
    }
  }
}

export default EntityBuilder;

import Entity from '../interfaces/Entity';
import AntEntity from '../entities/AntEntity';
import { Builder } from './Builder';
import { EntityType } from '../types';
import Vector from '../interfaces/Vector';
import Size from '../interfaces/Size';
import EnemyEntity from '../entities/EnemyEntity';

class EntityBuilder extends Builder<Entity> {
  speed: number = 0;
  position: Vector = { x: 0, y: 0 };
  velocity: Vector = { x: 0, y: 0 };
  size: number = 1;

  constructor() {
    super();
  }

  create(type: EntityType) {
    this.type = type;
    return this;
  }

  setPosition(x: number, y: number) {
    this.position = { x, y };
    return this;
  }

  setVelocity(x: number, y: number ) {
    this.velocity = { x, y };
    return this;
  }

  setSize(size: number) {
    this.size = size;
    return this;
  }

  setSpeed(speed: number) {
    this.speed = speed;
    return this;
  }

  build(): Entity {
    switch (this.type) {
      case EntityType.Ant:
        return new AntEntity(
          this.position.x,
          this.position.y,
          this.size,
          this.velocity.x,
          this.velocity.y,
          this.speed,
        );
      case EntityType.Enemy:
        return new EnemyEntity();
      default:
        throw new Error('Invalid entity type!');
    }
  }
}

export default EntityBuilder;

import Entity from '../interfaces/Entity';
import AntEntity from '../entities/AntEntity';
import FoodEntity from '../entities/FoodEntity';
import { Builder } from './Builder';
import { EntityType } from '../types';
import Vector from '../interfaces/Vector';
import Size from '../interfaces/Size';
import Mutation from '../entities/mutations/Mutation';
import EnemyEntity from '../entities/EnemyEntity';

class EntityBuilder extends Builder<Entity> {
  id: string = '';
  moment: number = 0;
  speed: number = 0;
  maxSpeed: number = 1;
  position: Vector = { x: 0, y: 0 };
  velocity: Vector = { x: 0, y: 0 };
  size: number = 1;
  mass: number = 2;
  mutations: Map<string, Mutation> = new Map();

  constructor() {
    super();
  }

  create(type: EntityType) {
    this.type = type;
    this.speed = 0;
    this.position = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.size = 1;
    this.mutations = new Map();
    return this;
  }

  setId(id: string) {
    this.id = id;
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

  setMoment(moment: number) {
    this.moment = moment;
    return this;
  }

  setMaxSpeed(maxSpeed: number) {
    this.maxSpeed = maxSpeed;
    return this;
  }

  setMass(mass: number) {
    this.mass = mass;
    return this;
  }

  addMutation(mutation: Mutation) {
    this.mutations.set(mutation.name, mutation);
    return this;
  }

  build(): Entity {
    switch (this.type) {
      case EntityType.Ant:
        return new AntEntity(
          this.id,
          this.position.x,
          this.position.y,
          this.size,
          this.mass,
          this.velocity.x,
          this.velocity.y,
          this.speed,
          this.mutations,
        );
      case EntityType.Enemy:
        return new EnemyEntity(
          this.id,
          this.position.x,
          this.position.y,
          this.size,
          this.mass,
          this.velocity.x,
          this.velocity.y,
          this.moment,
          this.speed,
          this.maxSpeed,
          this.mutations,
        );
      case EntityType.Food:
        return new FoodEntity(
          this.id,
          this.position.x,
          this.position.y,
          this.size,
          this.mass,
        );
      default:
        throw new Error('Invalid entity type!');
    }
  }
}

export default EntityBuilder;

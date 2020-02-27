import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../interfaces/Entity';
import Drawable from '../interfaces/Drawable';
import AntEntity from '../entities/AntEntity';
import EnemyEntity from '../entities/EnemyEntity';
import EatMutation from '../entities/mutations/EatMutation';
import SizeMutation from '../entities/mutations/SizeMutation';
import MoveMutation from '../entities/mutations/MoveMutation';
import IdleMutation from '../entities/mutations/IdleMutation';
import { BuilderType, EntityType } from '../types';

class EntityManager {
  readonly ants: Entity[] = [];
  readonly enemies: Entity[] = [];

  constructor() {
    const bc = new BuilderCreator();
    const builder = bc.createEntityBuilder();

    const enemy = builder
      .create(EntityType.Enemy)
      .build();

    // for(let i = 0; i < 10; i+= 1) {
    //   setTimeout(() => {
    for (let i = 0; i < 2000; i += 1) {
      const x = window.innerWidth * Math.random();
      const y = window.innerHeight * Math.random();
      const Mutation = (i === 0) ? IdleMutation : EatMutation;
      const speed = 1;
      const size = 2; // ((1 - speed) + 1) * 8;
      const ant = builder
        .create(EntityType.Ant)
        .setPosition(x, y)
        .setSize(size)
        .setSpeed(speed)
        .addMutation(new Mutation)
        .addMutation(new MoveMutation)
        .build();
      this.ants.push(ant);
    }
      // }, i * 50);
    // }
    
    this.enemies.push(enemy);
  }

  // getAntsDrawable(): Drawable[] {
  //   return this.ants as Drawable[];
  // }

  // getEnemiesDrawable(): Drawable[] {
  //   return this.enemies as Drawable[];
  // }
}

export default new EntityManager;

import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../interfaces/Entity';
import Drawable from '../interfaces/Drawable';
import AntEntity from '../entities/AntEntity';
import EnemyEntity from '../entities/EnemyEntity';
import SizeMutation from '../entities/mutations/SizeMutation';
import MoveMutation from '../entities/mutations/MoveMutation';
import { BuilderType, EntityType } from '../types';

class EntityManager {
  readonly ants: Entity[] = [];
  readonly enemies: Entity[] = [];

  constructor() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const bc = new BuilderCreator();
    const builder = bc.createEntityBuilder();

    const enemy = builder
      .create(EntityType.Enemy)
      .build();

    // for(let i = 0; i < 10; i+= 1) {
    //   setTimeout(() => {
    for (let i = 0; i < 500; i += 1) {
      const Mutation = Math.random() > 0.2 ? MoveMutation : SizeMutation;
      const speed = 1;
      const size = ((1 - speed) + 1) * 8;
      const ant = builder
        .create(EntityType.Ant)
        .setPosition(centerX, centerY)
        .setSize(size)
        .setSpeed(speed)
        .addMutation(new Mutation)
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

export default EntityManager;

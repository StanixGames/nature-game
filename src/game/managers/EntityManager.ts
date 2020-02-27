import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../interfaces/Entity';
import Drawable from '../interfaces/Drawable';
import AntEntity from '../entities/AntEntity';
import EnemyEntity from '../entities/EnemyEntity';
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
    for (let i = 0; i < 100; i += 1) {
      const speed = 2;
      const size = ((2 - speed) + 1) * 4;
      const ant = builder
        .create(EntityType.Ant)
        .setPosition(centerX, centerY)
        .setSize(size)
        .setSpeed(speed)
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

import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../entities/Entity';
import Drawable from '../entities/Drawable';
import AntEntity from '../entities/AntEntity';
import EnemyEntity from '../entities/EnemyEntity';
import { BuilderType, EntityType } from '../types';

class EntityManager {
  readonly ants: Entity[] = [];
  readonly enemies: Entity[] = [];

  constructor() {
    const bc = new BuilderCreator();

    const eb = bc.createBuilder(BuilderType.EntityBuilder);
    const ant = eb
      .create(EntityType.Ant)
      .build();
    const enemy = eb
      .create(EntityType.Enemy)
      .build();
    
    this.ants.push(ant);
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

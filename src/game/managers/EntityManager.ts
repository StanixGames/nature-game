import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../interfaces/Entity';
import Drawable from '../interfaces/Drawable';
import AntEntity from '../entities/AntEntity';
import EnemyEntity from '../entities/EnemyEntity';
import EatMutation from '../entities/mutations/EatMutation';
import SizeMutation from '../entities/mutations/SizeMutation';
import MoveMutation from '../entities/mutations/MoveMutation';
import IdleMutation from '../entities/mutations/IdleMutation';
import { EntityType } from '../types';

class EntityManager {
  protected ants: Map<number, Entity> = new Map();
  readonly enemies: Map<number, Entity> = new Map();

  constructor() {
    const bc = new BuilderCreator();
    const builder = bc.createEntityBuilder();
    
    for (let i = 0; i < 40; i += 1) {
      const id = i;
      const x = window.innerWidth * Math.random();
      const y = window.innerHeight * Math.random();
      const speed = 0.2;
      const maxSpeed = 0.2;
      const size = ((1 - speed) + 1) * 2;
      const enemy = builder
        .create(EntityType.Enemy)
        .setId(id)
        .setPosition(x, y)
        .setSize(size)
        .setSpeed(speed)
        .setMoment(0.01)
        .setMaxSpeed(maxSpeed)
        .addMutation(new EatMutation)
        .addMutation(new IdleMutation)
        .addMutation(new MoveMutation)
        .build();
      this.enemies.set(id, enemy);
    }

    setTimeout(() => {
      for (let i = 0; i < 10; i += 1) {
        const id = i;
        const x = window.innerWidth * Math.random();
        const y = window.innerHeight * Math.random();
        const speed = 1;
        const size = ((1 - speed) + 1) * 2;
        const ant = builder
          .create(EntityType.Ant)
          .setId(id)
          .setPosition(x, y)
          .setSize(size)
          .setSpeed(speed)
          .addMutation(new IdleMutation)
          .addMutation(new MoveMutation)
          .build();
        this.ants.set(id, ant);
      }
    }, 1000);
  }

  getRandomAnt(): Entity | null {
    if (this.ants.size > 0) {
      const antsArray = Array.from(this.ants.values());
      const randIndex = Math.floor(antsArray.length * Math.random());
      return antsArray[randIndex];
    }
    return null;
  }

  getAnts(): Map<number, Entity> {
    return this.ants;
  }

  getEnemies(): Map<number, Entity> {
    return this.enemies;
  }

  killAnt(id: number): void {
    if (this.ants.get(id)) {
      this.ants.delete(id);
    }
  }
}

export default new EntityManager;

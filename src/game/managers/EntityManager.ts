import { v1 as uuidv1 } from 'uuid';
import { Game } from '../Game';
import Manager from './Manager';
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
import EntityBuilder from '../builders/EntityBuilder';

export default class EntityManager extends Manager {
  protected builder: EntityBuilder;
  protected ants: Map<string, Entity> = new Map();
  protected enemies: Map<string, Entity> = new Map();

  constructor(game: Game) {
    super(game);

    const bc = new BuilderCreator();
    this.builder = bc.createEntityBuilder();

    // for (let i = 0; i < 40; i += 1) {
    //   const id = i;
    //   const x = window.innerWidth * Math.random();
    //   const y = window.innerHeight * Math.random();
    //   const speed = 0.2;
    //   const maxSpeed = 0.2;
    //   const size = ((1 - speed) + 1) * 2;
    //   const enemy = builder
    //     .create(EntityType.Enemy)
    //     .setId(id)
    //     .setPosition(x, y)
    //     .setSize(size)
    //     .setSpeed(speed)
    //     .setMoment(0.001)
    //     .setMaxSpeed(maxSpeed)
    //     .addMutation(new EatMutation)
    //     .addMutation(new IdleMutation)
    //     .addMutation(new MoveMutation)
    //     .build();
    //   this.enemies.set(id, enemy);
    // }
  }

  init(): void {
    // todo setup
  }
  
  destroy(): void {
    // todo clean up
  }

  createAnt(): void {
    const id = uuidv1();
    const x = window.innerWidth * Math.random();
    const y = window.innerHeight * Math.random();
    const speed = 1;
    const size = ((1 - speed) + 1) * 2;
    const ant = this.builder
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

  createEnemy(): void {
    const id = uuidv1();
    const x = window.innerWidth * Math.random();
    const y = window.innerHeight * Math.random();
    const speed = 1;
    const size = ((1 - speed) + 1) * 2;
    const enemy = this.builder
      .create(EntityType.Ant)
      .setId(id)
      .setPosition(x, y)
      .setSize(size)
      .setSpeed(speed)
      .addMutation(new EatMutation)
      .addMutation(new IdleMutation)
      .addMutation(new MoveMutation)
      .build();
    this.enemies.set(id, enemy);
  }

  getRandomAnt(): Entity | null {
    if (this.ants.size > 0) {
      const antsArray = Array.from(this.ants.values());
      const randIndex = Math.floor(antsArray.length * Math.random());
      return antsArray[randIndex];
    }
    return null;
  }

  getAnts(): Map<string, Entity> {
    return this.ants;
  }

  getEnemies(): Map<string, Entity> {
    return this.enemies;
  }

  killAnt(id: string): void {
    if (this.ants.get(id)) {
      this.ants.delete(id);
    }
  }
}

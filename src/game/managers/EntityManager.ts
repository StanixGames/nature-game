import { v1 as uuidv1 } from 'uuid';
import { Game } from '../Game';
import Manager from './Manager';
import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../interfaces/Entity';
import AntEntity from '../entities/AntEntity';
import EnemyEntity from '../entities/EnemyEntity';
import EatMutation from '../entities/mutations/EatMutation';
import SizeMutation from '../entities/mutations/SizeMutation';
import MoveMutation from '../entities/mutations/MoveMutation';
import IdleMutation from '../entities/mutations/IdleMutation';
import { EntityType } from '../types';
import EntityBuilder from '../builders/EntityBuilder';
import QuadTree from '../../utils/QuadTree';
import Rect from '../../utils/Rect';
import Node from '../../utils/Node';

export default class EntityManager extends Manager {
  protected builder: EntityBuilder;
  protected bg: Map<string, Entity> = new Map();
  protected ants: Map<string, Entity> = new Map();
  protected enemies: Map<string, Entity> = new Map();
  protected bgTree: QuadTree;

  constructor(game: Game) {
    super(game);

    this.bgTree = new QuadTree(
      new Rect(0, 0, window.innerWidth, window.innerHeight),
      100,
      20
    );
    const bc = new BuilderCreator();
    this.builder = bc.createEntityBuilder();
  }

  init(): void {
    // todo setup
  }
  
  destroy(): void {
    // todo clean up
  }

  createAnt(x: number = 0, y: number = 0): void {
    const id = uuidv1();
    const speed = 1;
    const size = 2;
    const ant = this.builder
      .create(EntityType.Ant)
      .setId(id)
      .setPosition(x, y)
      .setSize(size)
      .setSpeed(speed)
      .setMoment(0.001)
      .setMaxSpeed(1)
      .addMutation(new EatMutation)
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
    const size = 6;
    const enemy = this.builder
      .create(EntityType.Enemy)
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

  createFood(): void {
    const id = uuidv1();
    const x = window.innerWidth * Math.random();
    const y = window.innerHeight * Math.random();
    const size = 4;
    const food = this.builder
      .create(EntityType.Food)
      .setId(id)
      .setPosition(x, y)
      .setSize(size)
      .build();
    this.bg.set(id, food);
    this.bgTree.insert(food);
  }

  getRandomAnt(): Entity | null {
    if (this.ants.size > 0) {
      const antsArray = Array.from(this.ants.values());
      const randIndex = Math.floor(antsArray.length * Math.random());
      return antsArray[randIndex];
    }
    return null;
  }

  getRandomFood(): Entity | null {
    if (this.bg.size > 0) {
      const foodsArray = Array.from(this.bg.values());
      const randIndex = Math.floor(foodsArray.length * Math.random());
      return foodsArray[randIndex];
    }
    return null;
  }

  getAnts(): Map<string, Entity> {
    return this.ants;
  }

  getEnemies(): Map<string, Entity> {
    return this.enemies;
  }

  getBg(): Map<string, Entity> {
    return this.bg;
  }

  getBgTree(): QuadTree {
    return this.bgTree;
  }

  killAnt(id: string): void {
    if (this.ants.get(id)) {
      this.ants.delete(id);
    }
  }

  killFood(id: string): boolean {
    const deleted = this.bg.delete(id);

    if (deleted) {
      const arr = Array.from(this.bg.values());
      this.bgTree.clear();
      this.bgTree.insert(arr);
    }

    return deleted;
  }
}

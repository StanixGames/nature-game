import { v1 as uuidv1 } from 'uuid';
import { Game, WORLD_HEIGHT, WORLD_WIDTH, WORLD_FOOD_MAX_CAPACITY, WORLD_ANTS_MAX_CAPACITY } from '../Game';
import { entityInRange } from '../helpers';
import Manager from './Manager';
import BuilderCreator from '../builders/BuilderCreator';
import Entity from '../interfaces/Entity';
import AntEntity from '../entities/AntEntity';
import Living from '../interfaces/Living';
import EnemyEntity from '../entities/EnemyEntity';
import EatMutation from '../entities/mutations/EatMutation';
import SplitMutation from '../entities/mutations/SplitMutation';
import MoveMutation from '../entities/mutations/MoveMutation';
import IdleMutation from '../entities/mutations/IdleMutation';
import { EntityType } from '../types';
import {Targets} from '../interfaces/Targets';
import EntityBuilder from '../builders/EntityBuilder';
import QuadArray from '../../utils/QuadArray';

export default class EntityManager extends Manager {
  protected builder: EntityBuilder;
  protected bg: Map<string, Entity> = new Map();
  protected ants: Map<string, Entity> = new Map();
  protected enemies: Map<string, Entity> = new Map();
  protected bgArray: QuadArray;

  constructor(game: Game) {
    super(game);

    this.bgArray = new QuadArray(
      20,
      10,
      WORLD_WIDTH,
      WORLD_HEIGHT,
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

  createAnt(x: number = 0, y: number = 0, size: number = 6): void {
    const id = uuidv1();
    const speed = 0.5;
    const mass = size * 2;
    const ant = this.builder
      .create(EntityType.Ant)
      .setId(id)
      .setPosition(x, y)
      .setSize(size)
      .setMass(mass)
      .setSpeed(speed)
      .setMoment(0.001)
      .setMaxSpeed(4)
      .addMutation(new EatMutation)
      .addMutation(new IdleMutation)
      .addMutation(new MoveMutation)
      // .addMutation(new SplitMutation)
      .build();
    this.addAnt(ant);
  }

  createEnemy(): void {
    const id = uuidv1();
    const x = WORLD_WIDTH * Math.random();
    const y = WORLD_HEIGHT * Math.random();
    const speed = 1;
    const size = 6;
    const mass = size * 2;
    const enemy = this.builder
      .create(EntityType.Enemy)
      .setId(id)
      .setPosition(x, y)
      .setSize(size)
      .setMass(mass)
      .setSpeed(speed)
      .addMutation(new EatMutation)
      .addMutation(new IdleMutation)
      .addMutation(new MoveMutation)
      .build();
    this.enemies.set(id, enemy);
  }

  createFood(): void {
    const id = uuidv1();
    const x = WORLD_WIDTH * Math.random();
    const y = WORLD_HEIGHT * Math.random();
    const size = Math.random() * 5 + 5;
    const mass = size * 2;
    const food = this.builder
      .create(EntityType.Food)
      .setId(id)
      .setPosition(x, y)
      .setSize(size)
      .setMass(mass)
      .build();
    this.addFood(food);
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

  retriveObject(x: number, y: number, radius: number): Entity | null {
    // todo: optimize this

    const antsArray = Array.from(this.ants.values());
    for (let i = 0; i < antsArray.length; i += 1) {
      if (entityInRange(antsArray[i] as Living, x, y, radius)) {
        return antsArray[i];
      }
    }
    return null;
  }

  getFoodNearToOld(consumer: Living): Entity | null {
    const { x, y } = consumer;
    const cell = this.bgArray.retrive(x, y);
    if (cell) {
      let prevDistance = Infinity;
      let targetChild: Entity | null = null;
      cell.children.forEach((child: Living) => {
        const distance = Math.sqrt(
          Math.pow((child.x - x), 2) +
          Math.pow((child.y - y), 2)
        );
        if (distance < prevDistance) {
          prevDistance = distance;
          targetChild = child;
        }
      });
      return targetChild;
    }
    return null;
  }

  getFoodNearTo(consumer: Living): Entity | null {
    const { x, y } = consumer;
    const cellsToCheck = [
      { x, y },
      { x: x + this.bgArray.cellWidth, y },
      { x: x - this.bgArray.cellWidth, y },
      { x, y: y + this.bgArray.cellHeight },
      { x, y: y - this.bgArray.cellHeight },
      { x: x + this.bgArray.cellWidth, y: y + this.bgArray.cellHeight },
      { x: x + this.bgArray.cellWidth, y: y - this.bgArray.cellHeight },
      { x: x - this.bgArray.cellWidth, y: y - this.bgArray.cellHeight },
      { x: x - this.bgArray.cellWidth, y: y + this.bgArray.cellHeight },
    ]
    const cells = this.bgArray.retriveAll(cellsToCheck);
    if (cells.length > 0) {
      let prevDistance = Infinity;
      let targetChild: Entity | null = null;
      
      cells.forEach((cell) => {
        cell.children.forEach((child: Living) => {
          const distance = Math.sqrt(
            Math.pow((child.x - x), 2) +
            Math.pow((child.y - y), 2)
          );
          if (distance < prevDistance) {
            prevDistance = distance;
            targetChild = child;
          }
        });
      });
      return targetChild;
    }
    return null;
  }

  getFoodInRangeTo(consumer: Living, radius: number): Targets {
    const targetEntities: Entity[] = [];
    let targetChild: Entity | null = null;

    const { x, y } = consumer;
    const cellsToCheck = [
      { x, y },
      { x: x + this.bgArray.cellWidth, y },
      { x: x - this.bgArray.cellWidth, y },
      { x, y: y + this.bgArray.cellHeight },
      { x, y: y - this.bgArray.cellHeight },
      { x: x + this.bgArray.cellWidth, y: y + this.bgArray.cellHeight },
      { x: x + this.bgArray.cellWidth, y: y - this.bgArray.cellHeight },
      { x: x - this.bgArray.cellWidth, y: y - this.bgArray.cellHeight },
      { x: x - this.bgArray.cellWidth, y: y + this.bgArray.cellHeight },
    ];
    const cells = this.bgArray.retriveAll(cellsToCheck);
    if (cells.length > 0) {
      let prevDistance = Infinity;

      cells.forEach((cell) => {
        cell.children.forEach((child: Living) => {
          const distance = Math.sqrt(
            Math.pow((child.x - x), 2) +
            Math.pow((child.y - y), 2)
          );
          if (distance < consumer.size + radius) {
            targetEntities.push(child);
          }
          if (distance < prevDistance) {
            prevDistance = distance;
            targetChild = child;
          }
        });
      });
    }

    return {
      entities: targetEntities,
      nearest: targetChild,
    };
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

  getBgArray(): QuadArray {
    return this.bgArray;
  }

  killAnt(id: string): void {
    if (this.ants.get(id)) {
      this.ants.delete(id);
    }
  }

  killFood(id: string): boolean {
    const food = this.bg.get(id);
    if (food) {
      const deleted = this.bg.delete(id);
      if (deleted) {
        this.bgArray.remove(<Living>food);
      }
      return deleted;
    }
    return false;
  }
  
  addFood(food: Entity): void {
    if (this.bg.size < WORLD_FOOD_MAX_CAPACITY) {
      this.bg.set(food.id, food);
      this.bgArray.add(food as Living);
    } else {
      console.log(`Cannot create more than ${WORLD_FOOD_MAX_CAPACITY} food entities!`)
    }
  }

  addAnt(ant: Entity): void {
    if (this.ants.size < WORLD_ANTS_MAX_CAPACITY) {
      this.ants.set(ant.id, ant);
    } else {
      console.log(`Cannot create more than ${WORLD_ANTS_MAX_CAPACITY} ant entities!`)
    }
  }
}

import { Graphics } from 'pixi.js';
import Mutation from './mutations/Mutation';
import EatMutation from './mutations/EatMutation';
import Living from '../interfaces/Living';
import Mutable from '../interfaces/Mutable';
import Moving from '../interfaces/Moving';

class EnemyEntity implements Living, Mutable, Moving {
  id: string;
  name: string = 'enemy';
  hp: number = 100;
  x = 200;
  y = 200;
  size = 5;
  velX = 0;
  velY = 0;
  moment: number = 0;
  speed = 0;
  maxSpeed = 1;
  mutations: Map<string, Mutation>;

  constructor(id: string, x: number, y: number, size: number, velX: number, velY: number, moment: number, speed: number, maxSpeed: number, mutations: Map<string, Mutation>) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
    this.velX = velX;
    this.velY = velY;
    this.moment = moment;
    this.speed = speed;
    this.maxSpeed = maxSpeed;
    this.mutations = mutations;
  }

  mutate(): void {
    this.mutations.forEach((mutation) => mutation.mutate(this));
  }

  update(): void {
    this.mutate();
    if (this.speed < this.maxSpeed) {
      this.speed += this.moment;
    } else {
      this.speed -= this.moment;
    }
    if (this.velX !== 0) {
      this.x += this.velX;
    }
    if (this.velY !== 0) {
      this.y += this.velY;
    }
  }
}

export default EnemyEntity;

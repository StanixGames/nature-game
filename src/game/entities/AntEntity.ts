import { Graphics } from 'pixi.js';
import Mutation from './mutations/Mutation';
import EatMutation from './mutations/EatMutation';
import Living from '../interfaces/Living';
import Mutable from '../interfaces/Mutable';

class AntEntity implements Living, Mutable {
  id: string;
  name: string = 'ant';
  hp: number = 100;
  x = 100;
  y = 100;
  size = 1;
  velX = 0;
  velY = 0;
  speed = 0;
  mutations: Map<string, Mutation>;

  constructor(id: string, x: number, y: number, size: number, velX: number, velY: number, speed: number, mutations: Map<string, Mutation>) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
    this.velX = velX;
    this.velY = velY;
    this.speed = speed;
    this.mutations = mutations;
  }

  mutate(): void {
    this.mutations.forEach((mutation) => mutation.mutate(this));
  }

  update(): void {
    this.mutate();
    if (this.velX !== 0) {
      this.x += this.velX;
    }
    if (this.velY !== 0) {
      this.y += this.velY;
    }
  }
}

export default AntEntity;

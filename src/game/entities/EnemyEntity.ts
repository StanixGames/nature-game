import { Graphics } from 'pixi.js';
import Mutation from './mutations/Mutation';
import Living from '../interfaces/Living';
import Drawable from '../interfaces/Drawable';
import Mutable from '../interfaces/Mutable';
import Moving from '../interfaces/Moving';

class EnemyEntity implements Drawable, Living, Mutable, Moving {
  id: string;
  name: string = 'ant';
  color: number = 0xFF00FF;
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

  render(g: Graphics) {
    const semiSize = this.size / 2;
    g.beginFill(this.color, 0.6);
    g.moveTo(this.x - semiSize, this.y - semiSize);
    g.lineTo(this.x + semiSize, this.y - semiSize);
    g.lineTo(this.x + semiSize, this.y + semiSize);
    g.lineTo(this.x - semiSize, this.y + semiSize);
    g.lineTo(this.x - semiSize, this.y - semiSize);
    g.closePath();
  }
}

export default EnemyEntity;

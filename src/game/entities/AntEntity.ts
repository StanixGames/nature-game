import { Graphics } from 'pixi.js';
import Mutation from './mutations/Mutation';
import Entity from '../interfaces/Entity';
import Living from '../interfaces/Living';
import Drawable from '../interfaces/Drawable';
import Mutable from '../interfaces/Mutable';
import SmartLevelOne from '../interfaces/SmartLevelOne';

class AntEntity implements Entity, Drawable, Living, Mutable, SmartLevelOne {
  name: string = 'ant';
  hp: number = 100;
  x = 100;
  y = 100;
  size = 1;
  velX = 0;
  velY = 0;
  speed = 0;
  targetX = -1;
  targetY = -1;
  targetSelected = false;
  targetRadius = 20;
  mutations: Map<string, Mutation>;

  constructor(x: number, y: number, size: number, velX: number, velY: number, speed: number, mutations: Map<string, Mutation>) {
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

  nextTarget() {
    // console.log(this.x, this.targetX, this.targetRadius, this.velX);
    if (!this.targetSelected) {
      this.targetX = Math.random() * window.innerWidth;
      this.targetY = Math.random() * window.innerHeight;
      this.targetSelected = true;

      const distange = Math.sqrt(
        Math.pow((this.x - this.targetX), 2) +
        Math.pow((this.y - this.targetY), 2)
      );
      // console.log('to target ', distange);

      const dx = Math.abs(this.x - this.targetX);
      const dy = Math.abs(this.y - this.targetY);
      this.velX = dx * this.speed / distange;
      this.velY = dy * this.speed / distange;

      if (this.targetX < this.x) {
        this.velX *= -1;
      }
      if (this.targetY < this.y) {
        this.velY *= -1;
      }
    } else if (
      this.x > this.targetX - this.targetRadius &&
      this.x < this.targetX + this.targetRadius &&
      this.y > this.targetY - this.targetRadius &&
      this.y < this.targetY + this.targetRadius
    ) {
      this.targetX = -1;
      this.targetY = -1;
      this.velX = 0;
      this.targetSelected = false;
    }
  }

  update(): void {
    this.mutate();
    // this.nextTarget();
    if (this.velX !== 0) {
      this.x += this.velX;
    }
    if (this.velY !== 0) {
      this.y += this.velY;
    }
  }

  render(g: Graphics) {
    g.beginFill(0xffFF00, 0.5);
    g.drawCircle(this.x, this.y, this.size);
    g.closePath();
  }
}

export default AntEntity;

import { Graphics } from 'pixi.js';
import Mutation from './mutations/Mutation';
import Living from '../interfaces/Living';
import Drawable from '../interfaces/Drawable';
import Mutable from '../interfaces/Mutable';

class AntEntity implements Drawable, Living, Mutable {
  id: number;
  name: string = 'ant';
  color: number = 0xFFFF00;
  hp: number = 100;
  x = 100;
  y = 100;
  size = 1;
  velX = 0;
  velY = 0;
  speed = 0;
  mutations: Map<string, Mutation>;

  constructor(id: number, x: number, y: number, size: number, velX: number, velY: number, speed: number, mutations: Map<string, Mutation>) {
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

  render(g: Graphics) {
    // let color = 0xffFF00;
    // if (this.mutations.get('eat')) {
    //   color = 0xff0000;
    // }
    g.beginFill(this.color, 0.6);
    g.drawCircle(this.x, this.y, this.size);
    g.closePath();
  }
}

export default AntEntity;

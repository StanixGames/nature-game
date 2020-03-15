import { Graphics } from 'pixi.js';
import Living from '../interfaces/Living';

class FoodEntity implements Living {
  id: string;
  name: string = 'food';
  hp: number = 100;
  x = 200;
  y = 200;
  size: number;
  mass: number;

  constructor(id: string, x: number, y: number, size: number, mass: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
    this.mass = mass;
  }

  update(): void {
    // todo
  }
}

export default FoodEntity;

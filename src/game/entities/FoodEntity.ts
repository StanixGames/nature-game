import { Graphics } from 'pixi.js';
import Living from '../interfaces/Living';
import Drawable from '../interfaces/Drawable';

class FoodEntity implements Drawable, Living {
  id: string;
  name: string = 'food';
  color: number = 0x00FF00;
  hp: number = 100;
  x = 200;
  y = 200;
  size = 5;

  constructor(id: string, x: number, y: number, size: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
  }

  update(): void {
    // todo
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

export default FoodEntity;

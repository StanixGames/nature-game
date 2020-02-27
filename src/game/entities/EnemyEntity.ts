import { Graphics } from 'pixi.js';
import Entity from './Entity';
import Living from './Living';
import Drawable from './Drawable';

class EnemyEntity implements Entity, Drawable, Living {
  name: string = 'ant';
  hp: number = 100;
  x = 200;
  y = 200;
  size = 5;

  update(): void {
    
  }

  render(g: Graphics) {
    const semiSize = this.size / 2;
    g.beginFill(0xffFF00, 0.5);
    g.moveTo(this.x - semiSize, this.y - semiSize);
    g.lineTo(this.x + semiSize, this.y - semiSize);
    g.lineTo(this.x + semiSize, this.y + semiSize);
    g.lineTo(this.x - semiSize, this.y + semiSize);
    g.lineTo(this.x - semiSize, this.y - semiSize);
    g.closePath();
  }
}

export default EnemyEntity;

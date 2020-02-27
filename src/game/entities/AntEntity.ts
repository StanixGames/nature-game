import { Graphics } from 'pixi.js';
import Entity from './Entity';
import Living from './Living';
import Drawable from './Drawable';
import Moving from './Moving';

class AntEntity implements Entity, Drawable, Living, Moving {
  name: string = 'ant';
  hp: number = 100;
  x = 100;
  y = 100;
  size = 5;
  velX = 0.4;
  velY = 0;

  update(): void {
    if (this.velX > 0) {
      this.x += this.velX;
    }
    if (this.velY > 0) {
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

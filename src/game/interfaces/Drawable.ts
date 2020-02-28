import Entity from './Entity';
import { Graphics } from 'pixi.js';

interface Drawable extends Entity {
  color: number;
  render(g: Graphics): void;
}

export default Drawable;

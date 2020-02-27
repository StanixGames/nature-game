import { Graphics } from 'pixi.js';

interface Drawable {
  render(g: Graphics): void;
}

export default Drawable;

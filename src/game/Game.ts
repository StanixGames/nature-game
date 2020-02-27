import * as PIXI from 'pixi.js';
import Renderer from './Renderer';

const FPS = 60;
const FT = 1000/FPS;

class Game {
  readonly value: number;
  readonly rndr: Renderer;
  readonly app: PIXI.Application;
  // private working: boolean;

  constructor() {
    this.value = 10;
    this.app = new PIXI.Application();
    this.rndr = new Renderer();
    // this.working = false;
  }

  init() {
    this.app.ticker.add(this.tick);
    this.start();
  }

  start() {
    // todo
  }

  tick = () => {
    console.log(this.value);
  }
}

export default new Game();

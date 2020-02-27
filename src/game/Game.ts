import * as PIXI from 'pixi.js';
import Renderer from './Renderer';
import EntityManager from './managers/EntityManager';

const FPS = 60;
const FT = 1000/FPS;

class Game {
  readonly value: number;
  readonly rndr: Renderer;
  readonly app: PIXI.Application;
  readonly em: EntityManager;
  // private working: boolean;

  constructor() {
    this.value = 10;
    this.app = new PIXI.Application();
    this.rndr = new Renderer();
    this.em = new EntityManager();
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

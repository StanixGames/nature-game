import * as PIXI from 'pixi.js';
import Renderer from './Renderer';
import Living from './entities/Living';
import EntityManager from './managers/EntityManager';

const FPS = 60;
const FT = 1000/FPS;

export class Game {
  readonly value: number;
  readonly rndr: Renderer;
  readonly app: PIXI.Application;
  readonly em: EntityManager;
  // private working: boolean;

  constructor() {
    this.value = 10;
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x121721,
      resolution: window.devicePixelRatio || 1,
    });
    this.rndr = new Renderer(this);
    this.em = new EntityManager();
    // this.working = false;
  }

  init() {
    const gameElem = document.getElementById('game');
    if (gameElem) {
      gameElem.appendChild(this.app.view);
    } else {
      console.log('Invalid game init');
    }
    this.app.ticker.add(this.tick);
    
    this.rndr.init();
  }

  start() {
    // todo
  }

  tick = () => {
    this.em.ants.forEach((entity) => (entity as Living).update());
    this.rndr.beforeRender();
    this.rndr.render(this.em.ants);
    this.rndr.render(this.em.enemies);
  }
}

export default new Game();

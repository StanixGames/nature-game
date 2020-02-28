import * as PIXI from 'pixi.js';
import Renderer, { RenderLayer } from './Renderer';
import Living from './interfaces/Living';
import EntityManager from './managers/EntityManager';
import WorldManager from './managers/WorldManager';

const FPS = 60;
const FT = 1000/FPS;

export class Game {
  readonly worldManager: WorldManager;
  readonly entityManager: EntityManager;
  readonly value: number;
  readonly rndr: Renderer;
  readonly app: PIXI.Application;
  // private working: boolean;

  constructor() {
    this.value = 10;
    this.worldManager = new WorldManager(this);
    this.entityManager = new EntityManager(this);

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x121721,
      resolution: window.devicePixelRatio || 1,
    });
    this.rndr = new Renderer(this);
    // this.em = EntityManager;
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
    this.entityManager.init();
    this.worldManager.init();
  }

  start() {
    // todo
  }

  tick = () => {
    this.entityManager.getAnts().forEach((entity) => (<Living>entity).update());
    this.entityManager.getEnemies().forEach((entity) => (<Living>entity).update());
    this.rndr.beforeRender();
    this.rndr.render(RenderLayer.ANTS, this.entityManager.getAnts());
    this.rndr.render(RenderLayer.ENEMIES, this.entityManager.getEnemies());
  }
}

export default new Game();

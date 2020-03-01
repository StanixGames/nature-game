import * as PIXI from 'pixi.js';
import Living from './interfaces/Living';
import EntityManager from './managers/EntityManager';
import WorldManager from './managers/WorldManager';
import WorldRenderer from './renderers/WorldRenderer';
import EntityRenderer from './renderers/EntityRenderer';

const FPS = 60;
const FT = 1000/FPS;

export class Game {
  readonly worldManager: WorldManager;
  readonly entityManager: EntityManager;
  readonly worldRenderer: WorldRenderer;
  readonly entityRenderer: EntityRenderer;
  readonly value: number;
  readonly app: PIXI.Application;

  constructor() {
    this.value = 10;
    this.worldManager = new WorldManager(this);
    this.entityManager = new EntityManager(this);
    this.worldRenderer = new WorldRenderer(this);
    this.entityRenderer = new EntityRenderer(this);

    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x121721,
      resolution: window.devicePixelRatio || 1,
    });
  }

  init() {
    const gameElem = document.getElementById('game');
    if (gameElem) {
      gameElem.appendChild(this.app.view);
    } else {
      console.log('Invalid game init');
    }
    this.app.ticker.add(this.tick);
    
    this.worldRenderer.init();
    this.entityRenderer.init();
    this.entityManager.init();
    this.worldManager.init();
  }

  start() {
    // todo
  }

  tick = () => {
    // TODO fix update / render performace
    this.entityManager.getBg().forEach((entity) => (<Living>entity).update());
    this.entityManager.getAnts().forEach((entity) => (<Living>entity).update());
    this.entityManager.getEnemies().forEach((entity) => (<Living>entity).update());

    //render
    this.worldRenderer.prepare();
    this.worldRenderer.render();
    this.entityRenderer.prepare();
    this.entityRenderer.render();
  }
}

export default new Game();

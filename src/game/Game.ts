import * as PIXI from 'pixi.js';
import Living from './interfaces/Living';
import EntityManager from './managers/EntityManager';
import WorldManager from './managers/WorldManager';
import InputManager from './managers/InputManager';
import GUIManager from './managers/GUIManager';
import WorldRenderer from './renderers/WorldRenderer';
import EntityRenderer from './renderers/EntityRenderer';
import DebugRenderer from './renderers/DebugRenderer';

const FPS = 60;
const FT = 1000/FPS;

export const WORLD_WIDTH = 1000;
export const WORLD_HEIGHT = 1000;
export const WORLD_FOOD_MAX_CAPACITY = 1000;
export const WORLD_ANTS_MAX_CAPACITY = 500;
// export const WORLD__MAX_CAPACITY = 500;

export class Game {
  readonly worldManager: WorldManager;
  readonly entityManager: EntityManager;
  readonly inputManager: InputManager;
  readonly guiManager: GUIManager;
  readonly worldRenderer: WorldRenderer;
  readonly entityRenderer: EntityRenderer;
  readonly debugRenderer: DebugRenderer;
  readonly value: number;
  readonly app: PIXI.Application;

  constructor() {
    this.value = 10;
    this.worldManager = new WorldManager(this);
    this.entityManager = new EntityManager(this);
    this.inputManager = new InputManager(this);
    this.guiManager = new GUIManager(this);
    this.worldRenderer = new WorldRenderer(this);
    this.entityRenderer = new EntityRenderer(this);
    this.debugRenderer = new DebugRenderer(this);

    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundColor: 0x121721,
    });

    window.addEventListener("resize", () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
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
    
    this.entityManager.init();
    this.worldManager.init();
    this.inputManager.init();
    this.guiManager.init();

    this.worldRenderer.init();
    this.entityRenderer.init();
    this.debugRenderer.init();
  }

  destroy() {
    this.entityManager.destroy();
    this.worldManager.destroy();
    this.inputManager.destroy();
    this.guiManager.destroy();

    this.worldRenderer.destroy();
    this.entityRenderer.destroy();
    this.debugRenderer.destroy();
    this.app.destroy();
  }

  tick = () => {
    // TODO fix update / render performace
    this.entityManager.getBg().forEach((entity) => (<Living>entity).update());
    this.entityManager.getAnts().forEach((entity) => (<Living>entity).update());
    this.entityManager.getEnemies().forEach((entity) => (<Living>entity).update());
    this.guiManager.update();
    
    //render
    this.worldRenderer.prepare();
    this.worldRenderer.render();
    this.entityRenderer.prepare();
    this.entityRenderer.render();
    this.debugRenderer.prepare();
    this.debugRenderer.render();
  }
}

export default new Game();

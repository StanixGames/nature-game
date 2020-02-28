import * as PIXI from 'pixi.js';
import Entity from './interfaces/Entity';
import Drawable from './interfaces/Drawable';
import { Game } from './Game';

class Renderer {
  readonly game: Game;
  readonly g: PIXI.Graphics;

  constructor(game: Game) {
    this.game = game;
    this.g = new PIXI.Graphics();
  }

  init() {
    // init graphics for the layer
    this.game.app.stage.addChild(this.g);
  }

  beforeRender(): void {
    this.g.clear();
  }

  render(entities: Map<number, Entity>): void {
    entities.forEach(
      (entity) => (<Drawable>entity).render(this.g)
    );
  }
}

export default Renderer;

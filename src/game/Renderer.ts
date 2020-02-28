import * as PIXI from 'pixi.js';
import Entity from './interfaces/Entity';
import Drawable from './interfaces/Drawable';
import { Game } from './Game';

export enum RenderLayer {
  BG,
  ANTS,
  ENEMIES,
  EFFECTS,
};

class Renderer {
  readonly game: Game;
  readonly layers: [
    PIXI.Graphics, // bg
    PIXI.Graphics, // ants
    PIXI.Graphics, // enemies
    PIXI.Graphics, // effects
  ];

  constructor(game: Game) {
    this.game = game;
    this.layers = [
      new PIXI.Graphics(),
      new PIXI.Graphics(),
      new PIXI.Graphics(),
      new PIXI.Graphics(),
    ];
  }

  init() {
    // init graphics for the layer
    this.layers.forEach((layer) => {
      this.game.app.stage.addChild(layer);
    });
  }

  beforeRender(): void {
    this.layers.forEach((layer) => layer.clear());
  }

  render(layer: RenderLayer, entities: Map<string, Entity>): void {
    entities.forEach(
      (entity) => (<Drawable>entity).render(this.layers[layer])
    );
  }
}

export default Renderer;

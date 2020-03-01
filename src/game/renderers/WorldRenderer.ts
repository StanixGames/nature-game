import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import Living from '../interfaces/Living';
import Renderer from './Renderer';

export default class WorldRenderer extends Renderer {
  private worldLayer: PIXI.Graphics;

  constructor(game: Game) {
    super(game);
    this.worldLayer = new PIXI.Graphics();
  }

  init() {
    this.game.app.stage.addChild(this.worldLayer);
  }

  prepare(): void {
    this.worldLayer.clear();
  }
  
  render(): void {
    const entities = this.game.entityManager.getBg();
    entities.forEach((entity) => {
      if (entity.name === 'food') {
        const { x, y, size } = <Living>entity;
        const s2 = size / 2;
        const s6 = size / 6;
        this.worldLayer.beginFill(0xFFFF00, 0.6);
        this.worldLayer.moveTo(x - s2, y);
        this.worldLayer.lineTo(x - s6, y - s6);
        this.worldLayer.lineTo(x, y - s2);
        this.worldLayer.lineTo(x + s6, y - s6);
        this.worldLayer.lineTo(x + s2, y);
        this.worldLayer.lineTo(x + s6, y + s6);
        this.worldLayer.lineTo(x, y + s2);
        this.worldLayer.lineTo(x - s6, y + s6);
        this.worldLayer.lineTo(x - s2, y);
        this.worldLayer.closePath();
      }
    });
  }
}

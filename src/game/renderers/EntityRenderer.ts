import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import Living from '../interfaces/Living';
import Mutable from '../interfaces/Mutable';
import EatMutation from '../entities/mutations/EatMutation';
import Renderer from './Renderer';

export default class EntityRenderer extends Renderer {
  private entityLayer: PIXI.Graphics;

  constructor(game: Game) {
    super(game);
    this.entityLayer = new PIXI.Graphics();
  }

  init() {
    this.game.app.stage.addChild(this.entityLayer);
  }

  prepare(): void {
    this.entityLayer.clear();
  }
  
  render(): void {
    const entities = this.game.entityManager.getAnts();
    entities.forEach((entity) => {
      if (entity.name === 'ant') {
        const { x, y, size } = <Living>entity;
        this.entityLayer.beginFill(0x00FFFF, 0.6);
        this.entityLayer.drawCircle(x, y, size);
        this.entityLayer.closePath();
      }
    });

    const enemies = this.game.entityManager.getEnemies();
    enemies.forEach((enemy) => {
      if (enemy.name === 'enemy') {
        const { x, y, size } = <Living>enemy;
        const s2 = size / 2;
        this.entityLayer.beginFill(0xFF0000, 0.6);
        this.entityLayer.moveTo(x - s2, y);
        this.entityLayer.lineTo(x, y - s2);
        this.entityLayer.lineTo(x + s2, y);
        this.entityLayer.lineTo(x, y + s2);
        this.entityLayer.lineTo(x - s2, y);

        // Debug
        const mutation = (<Mutable><unknown>enemy).mutations.get('eat');
        if (mutation) {
          const eatMutation = <EatMutation>mutation;
          if (eatMutation.targetEntity) {
            const targetEntity = <Living>eatMutation.targetEntity;
            this.entityLayer.lineStyle(1, 0xffffff);
            this.entityLayer.moveTo(x, y);
            this.entityLayer.lineTo(targetEntity.x, targetEntity.y);
            this.entityLayer.lineStyle(0);
          }
        }

        this.entityLayer.closePath();
      }
    })
  }
}

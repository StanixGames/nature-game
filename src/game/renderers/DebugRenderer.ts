import * as PIXI from 'pixi.js';
import { Game, WORLD_WIDTH, WORLD_HEIGHT } from '../Game';
import Living from '../interfaces/Living';
import Mutable from '../interfaces/Mutable';
import EatMutation from '../entities/mutations/EatMutation';
import Renderer from './Renderer';
import {Targets} from '../interfaces/Targets';

export default class DebugRenderer extends Renderer {
  private debugLayer: PIXI.Graphics;

  constructor(game: Game) {
    super(game);
    this.debugLayer = new PIXI.Graphics();
    this.debugLayer.width = WORLD_WIDTH;
    this.debugLayer.height = WORLD_HEIGHT;
  }

  init() {
    this.game.app.stage.addChild(this.debugLayer);
  }

  destroy() {
    this.game.app.stage.removeChild(this.debugLayer);
  }

  prepare(): void {
    this.debugLayer.clear();
    const worldOffset = this.game.worldManager.getWorldOffset();
    this.debugLayer.x = worldOffset[0];
    this.debugLayer.y = worldOffset[1];
    const worldScaling = this.game.worldManager.getScaling();
    this.debugLayer.scale.set(worldScaling, worldScaling);
  }
  
  render(): void {
    const entities = this.game.entityManager.getAnts();
    entities.forEach((entity) => {
      const { mutations } = entity as unknown as Mutable;
      const eatMutation = mutations.get('eat');
      if (eatMutation) {
        const targets: Targets = (eatMutation as EatMutation).targets;
        targets.entities.forEach((target) => {
          if (target !== targets.nearest) {
            const e = entity as Living;
            const t = target as Living;
            this.debugLayer.lineStyle(1, 0xffffff, 0.1);
            this.debugLayer.moveTo(e.x, e.y);
            this.debugLayer.lineTo(t.x, t.y);
          }
        });

        if (targets.nearest) {
          const e = entity as Living;
          const t = targets.nearest as Living;
          this.debugLayer.lineStyle(1, 0xFF0000, 0.3);
          this.debugLayer.moveTo(e.x, e.y);
          this.debugLayer.lineTo(t.x, t.y);
        }
      }
    });    
  }
}

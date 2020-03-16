import { Game } from '../Game';
import Entity from '../interfaces/Entity';
import Living from '../interfaces/Living';
import {store} from '../../store';
import {selectedSet, selectedRemove} from '../../store/selected-object';
import Manager from './Manager';

const UPDATE_EACH_MS = 500;

export default class GUIManager extends Manager {
  private selectedEntity: Entity | null;
  private prevUpdateTime: number;

  constructor(game: Game) {
    super(game);
    this.selectedEntity = null;
    this.prevUpdateTime = -Infinity;
  }

  init(): void {
   // todo
  }
  
  destroy(): void {
   // todo 
  }

  public update(): void {
    if (this.selectedEntity && Date.now() > this.prevUpdateTime + UPDATE_EACH_MS) {
      this.prevUpdateTime = Date.now();
      const { mass } = this.selectedEntity as Living;
      store.dispatch(selectedSet(this.selectedEntity.id, this.selectedEntity.name, mass));
    }
  }

  public setSelectedEntity(entity: Entity | null): void {
    this.selectedEntity = entity;
    if (entity) {
      const { mass } = entity as Living;
      store.dispatch(selectedSet(entity.id, entity.name, mass));
    } else {
      store.dispatch(selectedRemove());
    }
  }

  public getSelectedEntity(): Entity | null {
    return this.selectedEntity;
  }
}

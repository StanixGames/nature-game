import { Game, WORLD_WIDTH, WORLD_HEIGHT } from '../Game';
import Entity from '../interfaces/Entity';
import Manager from './Manager';

export default class WorldManager extends Manager {
  private worldOffset: [number, number];
  private prevWorldOffset: [number, number];
  private draggingPoint: [number, number];
  private scaling: number;
  private selectedEntity: Entity | null;

  constructor(game: Game) {
    super(game);
    this.worldOffset = [0, 0];
    this.prevWorldOffset = [0, 0];
    this.draggingPoint = [0, 0];
    this.scaling = 1;
    this.selectedEntity = null;
  }

  init(): void {
    for (let i = 0; i< 1000; i++) {
      this.game.entityManager.createAnt(
        WORLD_WIDTH / 2,
        WORLD_HEIGHT / 2,
      );
    //   this.game.entityManager.createAnt(
    //     window.innerWidth * Math.random(),
    //     window.innerHeight * Math.random(),
    //   );
    //   // this.game.entityManager.createEnemy();
    }
    
    setInterval(() => {
      const maxFood = Math.random() * 20 + 10;
      for (let i = 0; i < maxFood; i++) {
        this.game.entityManager.createFood();
      }
    }, 1000);
  }
  
  destroy(): void {
    // todo clean up
  }

  createMutationForRandomEnteties(populationPercent: number): void {

  }

  public setWorldOffset(xOffset: number, yOffset: number) {
    this.worldOffset = [
      this.prevWorldOffset[0] + xOffset - this.draggingPoint[0],
      this.prevWorldOffset[1] + yOffset - this.draggingPoint[1]
    ];
  }

  public getWorldOffset(): [number, number] {
    return this.worldOffset;
  }

  public getScaling(): number {
    return this.scaling;
  }

  public setDragging(status: boolean, x: number, y: number) {
    if (status) {
      this.draggingPoint = [x, y];
      this.prevWorldOffset = [
        this.worldOffset[0],
        this.worldOffset[1]
      ];
    }
  }

  public updateScaling(scale: number) {
    this.scaling += scale;
    if (this.scaling < 0.5) {
      this.scaling = 0.5;
    } else if (this.scaling > 3) {
      this.scaling = 4;
    }
  }

  public setActiveObject(x: number, y: number): void {
    this.selectedEntity = this.game.entityManager.retriveObject(x, y, 0);
  }

  public getSelectedEntity(): Entity | null {
    return this.selectedEntity;
  }
}

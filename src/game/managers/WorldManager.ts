import { Game } from '../Game';
import Manager from './Manager';

export default class WorldManager extends Manager {
  private worldOffset: [number, number];
  private dragging: boolean;
  private draggingPoint: [number, number];

  constructor(game: Game) {
    super(game);
    this.worldOffset = [0, 0];
    this.draggingPoint = [0, 0];
    this.dragging = false;
  }

  init(): void {
    this.game.entityManager.createAnt(
      window.innerWidth / 2,
      window.innerHeight / 2,
    );
    // for (let i = 0; i< 200; i++) {
    //   this.game.entityManager.createAnt(
    //     window.innerWidth * Math.random(),
    //     window.innerHeight * Math.random(),
    //   );
    //   // this.game.entityManager.createEnemy();
    // }
    
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
    this.worldOffset = [ xOffset - this.draggingPoint[0], yOffset ];
  }

  public getWorldOffset(): [number, number] {
    return this.worldOffset;
  }

  public setDragging(status: boolean, x: number, y: number) {
    this.dragging = status;
    if (status) {
      this.draggingPoint = [ x, y ];
    }
  }
}

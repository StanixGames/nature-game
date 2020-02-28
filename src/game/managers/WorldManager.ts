import { Game } from '../Game';
import Manager from './Manager';

export default class WorldManager extends Manager {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    for (let i = 0; i< 20; i++) {
      this.game.entityManager.createAnt();
      // this.game.entityManager.createEnemy();
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
}

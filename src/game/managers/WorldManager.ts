import { Game } from '../Game';
import Manager from './Manager';

export default class WorldManager extends Manager {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    for (let i = 0; i< 3000; i++) {
      this.game.entityManager.createAnt();
      this.game.entityManager.createEnemy();
    }
    // setInterval(() => this.game.entityManager.createAnt(), 1000);
  }
  
  destroy(): void {
    // todo clean up
  }

  createMutationForRandomEnteties(populationPercent: number): void {

  }
}

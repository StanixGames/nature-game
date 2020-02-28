import { Game } from '../Game';
import Manager from './Manager';

export default class WorldManager extends Manager {
  constructor(game: Game) {
    super(game);
  }

  init(): void {
    // todo setup
  }
  
  destroy(): void {
    // todo clean up
  }
}

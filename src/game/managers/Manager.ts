import { Game } from '../Game';

// export interface Manager {
//   game: Game;

//   init(): void;
//   destroy(): void;
// }

export default abstract class Manager {
  readonly game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  abstract init(): void;
  abstract destroy(): void;
}

import { Game } from '../Game';

export default abstract class Renderer {
  protected game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  
  abstract init(): void // first init
  abstract prepare(): void;
  abstract render(): void;
}

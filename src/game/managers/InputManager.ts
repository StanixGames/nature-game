import { Game } from '../Game';
import Manager from './Manager';

export default class InputManager extends Manager {
  private mouseDown: [boolean, boolean];

  constructor(game: Game) {
    super(game);
    this.mouseDown = [false, false];
  }

  init(): void {
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('wheel', this.handleMouseWheel);
  }
  
  destroy(): void {
    // todo clean up
  }

  handleMouseWheel = (event: WheelEvent): void => {
    const { deltaY } = event;
    this.game.worldManager.updateScaling(deltaY > 0 ? 0.01 : -0.01);
  }

  handleMouseUp = (event: MouseEvent): void => {
    const { button, pageX, pageY } = event;
    this.mouseDown[button] = false;
    this.game.worldManager.setDragging(false, pageX, pageY);
  }

  handleMouseDown = (event: MouseEvent): void => {
    const { button, pageX, pageY } = event;
    this.mouseDown[button] = true;
    this.game.worldManager.setDragging(true, pageX, pageY);
    this.game.worldManager.setActiveObject(pageX, pageY);
  }

  handleMouseMove = (event: MouseEvent): void => {
    const { pageX, pageY } = event;
    if (this.mouseDown[0]) {
      this.game.worldManager.setWorldOffset(pageX, pageY);
    }
  }
}

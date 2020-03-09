import Living from '../game/interfaces/Living';

export default class Cell {
  public x: number;
  public y: number;
  public children: Living[];

  constructor(x: number, y: number) {
    this.children = [];
    this.x = x;
    this.y = y;
  }
};
import Living from '../game/interfaces/Living';
import Cell from './Cell';

export default class QuadArray {
  readonly cells: Cell[][];
  readonly cellWidth: number;
  readonly cellHeight: number;

  constructor(xSize: number, ySize: number, width: number, height: number) {
    this.cells = [];
    this.cellWidth = width / xSize;
    this.cellHeight = height / ySize;

    for (let x = 0; x < xSize; x++) {
      this.cells[x] = [];
      for (let y = 0; y < ySize; y++) {
        this.cells[x][y] = new Cell(x, y);
      }  
    }
  }

  /**
   * Add new child to the array
   * @param child to add
   */
  add(child: Living): boolean {
    const cell = this.retrive(child.x, child.y);
    if (cell) {
      cell.children.push(child);
      return true;
    }
    return false;
  }

  /**
   * Removes provided child from a cell
   * @param child 
   */
  remove(child: Living): boolean {
    const cell = this.retrive(child.x, child.y);
    if (cell) {
      const childIndex = cell.children.indexOf(child);
      if (childIndex > -1) {
        return cell.children.splice(childIndex, 1).length > 0;
      }
    }
    return false;
  }

  /**
   * Returns a Cell that intersects provided coordinates
   * @param x coordinate
   * @param y coordinate
   */
  retrive(x: number, y: number): Cell | null {
    const xPad = Math.floor(x / this.cellWidth);
    const yPad = Math.floor(y / this.cellHeight);
    
    if (xPad > -1 && xPad < this.cells.length && yPad > -1 && yPad < this.cells[0].length) {
      return this.cells[xPad][yPad];
    }
    return null;
  }

   /**
    * Returns all Cells that intersects provided coordinates as array { x, y }
    * @param coords array of coordinates { x, y }
    */
  retriveAll(coords: { x: number, y: number }[]): Cell[] {
    const result: Cell[] = [];

    coords.forEach(({ x, y }) => {
      const cell = this.retrive(x, y);
      if (cell) {
        result.push(cell);
      }
    });

    return result;
  }
}
import Rect from './Rect';
import Node from './Node';

export default class BoundsNode extends Node {
  protected stuckChildren: Object[];

  constructor(bounds: Rect, depth: number = 0, limitChildren: number = 20, limitDepth: number = 4) {
    super(bounds, depth, limitDepth, limitChildren);
    this.stuckChildren = [];
  }
}

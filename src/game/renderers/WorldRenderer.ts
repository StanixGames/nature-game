import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import Living from '../interfaces/Living';
import Renderer from './Renderer';
import QuadArray from '../../utils/QuadArray';
// import QuadTree from '../../utils/QuadTree';
// import Node from '../../utils/Node';

export default class WorldRenderer extends Renderer {
  private worldLayer: PIXI.Graphics;

  constructor(game: Game) {
    super(game);
    this.worldLayer = new PIXI.Graphics();
  }

  init() {
    this.game.app.stage.addChild(this.worldLayer);
  }

  prepare(): void {
    this.worldLayer.clear();
  }
  
  render(): void {
    // const foodArray: QuadArray = this.game.entityManager.getBgArray();
    // const tree: QuadTree = this.game.entityManager.getBgTree();

    // this.renderQArray(foodArray);
    // this.renderNode(tree.root);

    const entities = this.game.entityManager.getBg();
    entities.forEach((entity) => {
      if (entity.name === 'food') {
        const { x, y, size } = <Living>entity;
        const s2 = size / 2;
        const s6 = size / 6;
        this.worldLayer.beginFill(0xFFFF00, 0.6);
        this.worldLayer.moveTo(x - s2, y);
        this.worldLayer.lineTo(x - s6, y - s6);
        this.worldLayer.lineTo(x, y - s2);
        this.worldLayer.lineTo(x + s6, y - s6);
        this.worldLayer.lineTo(x + s2, y);
        this.worldLayer.lineTo(x + s6, y + s6);
        this.worldLayer.lineTo(x, y + s2);
        this.worldLayer.lineTo(x - s6, y + s6);
        this.worldLayer.lineTo(x - s2, y);
        this.worldLayer.endFill();
        this.worldLayer.closePath();
      }
    });

    // const elements = tree.retrieve({ x: 150, y: 101 });
    // elements.forEach((el) => {
    //   const { x, y } = el;
    //   const s2 = 4;
    //   const s6 = 2;
    //   this.worldLayer.beginFill(0xFF00FF, 0.6);
    //   this.worldLayer.lineStyle(0);
    //   this.worldLayer.moveTo(x - s2, y);
    //   this.worldLayer.lineTo(x - s6, y - s6);
    //   this.worldLayer.lineTo(x, y - s2);
    //   this.worldLayer.lineTo(x + s6, y - s6);
    //   this.worldLayer.lineTo(x + s2, y);
    //   this.worldLayer.lineTo(x + s6, y + s6);
    //   this.worldLayer.lineTo(x, y + s2);
    //   this.worldLayer.lineTo(x - s6, y + s6);
    //   this.worldLayer.lineTo(x - s2, y);
    //   this.worldLayer.endFill();
    //   this.worldLayer.closePath();
    // });
  }

  // renderNode(node: Node) {
  //   if (node.bounds) {
  //     this.worldLayer.lineStyle(1, 0xffffff);
  //     this.worldLayer.moveTo(node.bounds.x, node.bounds.y);
  //     this.worldLayer.lineTo(node.bounds.x + node.bounds.width, node.bounds.y);
  //     this.worldLayer.lineTo(node.bounds.x + node.bounds.width, node.bounds.y + node.bounds.height);
  //     this.worldLayer.lineTo(node.bounds.x, node.bounds.y + node.bounds.height);
  //     this.worldLayer.moveTo(node.bounds.x, node.bounds.y);
  //     this.worldLayer.closePath();
  //   }
  //   if (node.nodes.length > 0) {
  //     node.nodes.forEach((node) => this.renderNode(node));
  //   }
  // }

  renderQArray(array: QuadArray) {
    this.worldLayer.lineStyle(1, 0xffffff);

    for (let i = 0; i < array.cells.length; i++) {
      this.worldLayer.moveTo(i * array.cellWidth, 0);
      this.worldLayer.lineTo(i * array.cellWidth, window.innerHeight);  
    }
    for (let i = 0; i < array.cells[0].length; i++) {
      this.worldLayer.moveTo(0, i * array.cellHeight);
      this.worldLayer.lineTo(window.innerWidth, i * array.cellHeight);  
    }
  }
}

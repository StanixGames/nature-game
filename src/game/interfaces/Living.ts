import Entity from './Entity';

interface Living extends Entity {
  x: number;
  y: number;
  size: number;
  hp: number;
  update(): void;
}

export default Living;

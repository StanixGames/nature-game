import Entity from './Entity';

interface Moving extends Entity {
  velX: number;
  velY: number;
  moment: number;
  speed: number;
  maxSpeed: number;
}

export default Moving;

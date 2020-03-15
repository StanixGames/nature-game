import { WORLD_WIDTH, WORLD_HEIGHT } from '../../Game';
import Vector from '../../interfaces/Vector';
import Mutation from './Mutation';

class IdleMutation implements Mutation {
  name: string = 'idle';
  targetSelected: boolean = false;
  targetPosition: Vector = { x: 0, y: 0 };
  targetRadius: number = 10;

  mutate(entity: any): void {
    if (!this.targetSelected) {
      const x = Math.random() * WORLD_WIDTH;
      const y = Math.random() * WORLD_HEIGHT;
      this.targetPosition = { x, y };
      this.targetSelected = true;
    } else if (
      entity.x > this.targetPosition.x - this.targetRadius &&
      entity.x < this.targetPosition.x + this.targetRadius &&
      entity.y > this.targetPosition.y - this.targetRadius &&
      entity.y < this.targetPosition.y + this.targetRadius
    ) {
      this.targetSelected = false;
    }
  }
}

export default IdleMutation;

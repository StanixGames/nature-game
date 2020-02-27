// import Entity from '../../interfaces/Entity';
import Vector from '../../interfaces/Vector';
import Mutation from './Mutation';

class IdleMutation implements Mutation {
  name: string = 'idle';
  targetSelected: boolean = false;
  targetPosition: Vector = { x: 0, y: 0 };
  targetRadius: number = 10;

  mutate(entity: any): void {
      if (!this.targetSelected) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
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

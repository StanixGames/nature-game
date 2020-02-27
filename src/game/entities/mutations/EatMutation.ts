// import Entity from '../../interfaces/Entity';
import Vector from '../../interfaces/Vector';
import Mutation from './Mutation';

class EatMutation implements Mutation {
  name: string = 'eat';
  targetSelected: boolean = false;
  targetPosition: Vector = { x: 0, y: 0 };
  targetRadius: number = 10;

  mutate(entity: any): void {
      // console.log(this.x, this.targetX, this.targetRadius, this.velX);
      if (!this.targetSelected) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        this.targetPosition = { x, y };
        this.targetSelected = true;
  
        // const distange = Math.sqrt(
        //   Math.pow((entity.x - x), 2) +
        //   Math.pow((entity.y - y), 2)
        // );
        // console.log('to target ', distange);
  
        // const dx = Math.abs(entity.x - x);
        // const dy = Math.abs(entity.y - y);
        // entity.velX = dx * entity.speed / distange;
        // entity.velY = dy * entity.speed / distange;
  
        // if (x < entity.x) {
        //   entity.velX *= -1;
        // }
        // if (y < entity.y) {
        //   entity.velY *= -1;
        // }
      } else if (
        entity.x > this.targetPosition.x - this.targetRadius &&
        entity.x < this.targetPosition.x + this.targetRadius &&
        entity.y > this.targetPosition.y - this.targetRadius &&
        entity.y < this.targetPosition.y + this.targetRadius
      ) {
        // entity.velX = 0;
        // entity.velY = 0;
        this.targetSelected = false;
      }
  }
}

export default EatMutation;

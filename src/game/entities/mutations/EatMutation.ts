import Entity from '../../interfaces/Entity';
import Vector from '../../interfaces/Vector';
import Mutation from './Mutation';
import EntityManager from '../../managers/EntityManager';

class EatMutation implements Mutation {
  name: string = 'eat';
  targetSelected: boolean = false;
  targetEntity?: Entity;
  targetRadius: number = 10;

  mutate(entity: any): void {
      if (!this.targetSelected) {
        this.targetEntity = EntityManager.ants[0];
        this.targetSelected = true;
  
      }
      // else if (
      //   entity.x > this.targetPosition.x - this.targetRadius &&
      //   entity.x < this.targetPosition.x + this.targetRadius &&
      //   entity.y > this.targetPosition.y - this.targetRadius &&
      //   entity.y < this.targetPosition.y + this.targetRadius
      // ) {
      //   this.targetSelected = false;
      // }
  }
}

export default EatMutation;

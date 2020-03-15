import Living from '../../interfaces/Living';
import {Targets} from '../../interfaces/Targets';
import Mutation from './Mutation';
const IDLE_SPEED_PERCENT = 0.4;

class MoveMutation implements Mutation {
  name: string = 'move';

  mutate(entity: any): void {
    // Follow food if mutation presents
    const eatMutation = entity.mutations.get('eat');
    const idleMutation = entity.mutations.get('idle');

    // console.log(eatMutation && eatMutation.targetEntity);
    if (eatMutation && eatMutation.targets.nearest) {
      const targets: Targets = eatMutation.targets;
      if (targets.nearest) {
        const { x, y } = targets.nearest as Living;
        const distange = Math.sqrt(
          Math.pow((entity.x - x), 2) +
          Math.pow((entity.y - y), 2)
        );

        const dx = Math.abs(entity.x - x);
        const dy = Math.abs(entity.y - y);
        
        if (entity.speed < entity.maxSpeed) {
          entity.speed += entity.moment;
        }
        entity.velX = dx * entity.speed / distange;
        entity.velY = dy * entity.speed / distange;

        if (x < entity.x) {
          entity.velX *= -1;
        }
        if (y < entity.y) {
          entity.velY *= -1;
        }
      }
    } else if (idleMutation) {
      const { x, y } = idleMutation.targetPosition;
      const distange = Math.sqrt(
        Math.pow((entity.x - x), 2) +
        Math.pow((entity.y - y), 2)
      );

      const dx = Math.abs(entity.x - x);
      const dy = Math.abs(entity.y - y);
      
      if (entity.speed > 1) {
        entity.speed -= entity.moment;
      }
      entity.velX = dx * entity.speed / distange;
      entity.velY = dy * entity.speed / distange;

      if (x < entity.x) {
        entity.velX *= -1;
      }
      if (y < entity.y) {
        entity.velY *= -1;
      }
    }
  }
}

export default MoveMutation;

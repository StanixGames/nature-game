// import Entity from '../../interfaces/Entity';
import Mutation from './Mutation';

const IDLE_SPEED_PERCENT = 0.4;

class MoveMutation implements Mutation {
  name: string = 'move';

  mutate(entity: any): void {
    // Follow food if mutation presents
    const eatMutation = entity.mutations.get('eat');
    const idleMutation = entity.mutations.get('idle');

    // console.log(eatMutation && eatMutation.targetEntity);
    if (eatMutation && eatMutation.targetEntity) {
      const { x, y } = eatMutation.targetEntity;
      const distange = Math.sqrt(
        Math.pow((entity.x - x), 2) +
        Math.pow((entity.y - y), 2)
      );

      const dx = Math.abs(entity.x - x);
      const dy = Math.abs(entity.y - y);
      entity.maxSpeed = 2;
      entity.velX = dx * entity.speed * 1 / distange;
      entity.velY = dy * entity.speed * 1 / distange;

      if (x < entity.x) {
        entity.velX *= -1;
      }
      if (y < entity.y) {
        entity.velY *= -1;
      }
    } else if (idleMutation) {
      const { x, y } = idleMutation.targetPosition;
      const distange = Math.sqrt(
        Math.pow((entity.x - x), 2) +
        Math.pow((entity.y - y), 2)
      );

      const dx = Math.abs(entity.x - x);
      const dy = Math.abs(entity.y - y);
      entity.maxSpeed = 0.2;
      entity.velX = dx * (entity.speed * IDLE_SPEED_PERCENT) / distange;
      entity.velY = dy * (entity.speed * IDLE_SPEED_PERCENT) / distange;

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

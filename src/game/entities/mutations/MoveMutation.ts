// import Entity from '../../interfaces/Entity';
import Mutation from './Mutation';

class MoveMutation implements Mutation {
  name: string = 'move';

  mutate(entity: any): void {
    // Follow food if mutation presents
    const eatMutation = entity.mutations.get('eat');
    if (eatMutation) {
      const { x, y } = eatMutation.targetPosition;
      const distange = Math.sqrt(
        Math.pow((entity.x - x), 2) +
        Math.pow((entity.y - y), 2)
      );

      const dx = Math.abs(entity.x - x);
      const dy = Math.abs(entity.y - y);
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

import Mutation from './Mutation';
import Game from '../../Game';
import { isMainThread } from 'worker_threads';

class SplitMutation implements Mutation {
  name: string = 'split';
  
  mutate(entity: any): void {
    if (entity.mass > 40) {
      const semiSize = entity.size / 2;
      Game.entityManager.createAnt(entity.x + semiSize, entity.y, semiSize);
      entity.size = semiSize;
      entity.mass = semiSize * 2;
      entity.x -= semiSize;
    }
  }
}

export default SplitMutation;

// import Entity from '../../interfaces/Entity';
import Mutation from './Mutation';

class MoveMutation implements Mutation {
  mutate(entity: any): void {
    entity.speed += 0.00001;
  }
}

export default MoveMutation;

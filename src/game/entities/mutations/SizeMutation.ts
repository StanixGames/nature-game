import Mutation from './Mutation';

class SizeMutation implements Mutation {
  mutate(entity: any): void {
    entity.size += 0.01;
  }
}

export default SizeMutation;

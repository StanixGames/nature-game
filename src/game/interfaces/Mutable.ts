import Mutation from '../entities/mutations/Mutation';

interface Mutable {
  mutations: Mutation[];
  mutate(): void;
}

export default Mutable;

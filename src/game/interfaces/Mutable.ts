import Mutation from '../entities/mutations/Mutation';

interface Mutable {
  mutations: Map<string, Mutation>;
  mutate(): void;
}

export default Mutable;

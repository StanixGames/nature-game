interface Mutation {
  name: string;
  mutate(entity: any): void;
}

export default Mutation;

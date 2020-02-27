import BuilderCreator from '../builders/BuilderCreator';
import { BuilderType, EntityType } from '../types';

class EntityManager {
  constructor() {
    const bc = new BuilderCreator();

    const eb = bc.createBuilder(BuilderType.EntityBuilder);
    const entity = eb
      .create(EntityType.Ant)
      .build();
    const entity2 = eb
      .create(EntityType.Enemy)
      .build();
    console.log(entity);
    console.log(entity2);
  }
}

export default EntityManager;

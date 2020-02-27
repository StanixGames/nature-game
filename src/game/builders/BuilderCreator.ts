import EntityBuilder from './EntityBuilder';

class BuilderCreator {
  createEntityBuilder(): EntityBuilder {
    return new EntityBuilder();
  }
}

export default BuilderCreator;

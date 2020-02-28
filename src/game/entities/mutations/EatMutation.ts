import Entity from '../../interfaces/Entity';
import Living from '../../interfaces/Living';
import Mutation from './Mutation';
import EntityManager from '../../managers/EntityManager';

class EatMutation implements Mutation {
  name: string = 'eat';
  targetSelected: boolean = false;
  targetEntity?: Entity;
  targetRadius: number = 10;

  mutate(entity: any): void {
    if (!this.targetSelected) {
      const entity = EntityManager.getRandomAnt();

      if (entity) {
        this.targetEntity = entity;
        this.targetSelected = true;
      }
    } else {
      if (this.targetEntity) {
        const { id, x, y, size } = <Living>this.targetEntity;
        const distance = Math.sqrt(
          Math.pow((entity.x - x), 2) +
          Math.pow((entity.y - y), 2)
        );
        const minSize = entity.size / 2 + size / 2;

        if (distance < minSize) {
          EntityManager.killAnt(id);
          this.targetSelected = false;
          this.targetEntity = undefined;
        }
      }
    }
  }
}

export default EatMutation;

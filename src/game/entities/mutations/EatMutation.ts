import Game from '../../Game';
import Entity from '../../interfaces/Entity';
import Drawable from '../../interfaces/Drawable';
import Living from '../../interfaces/Living';
import Mutation from './Mutation';

class EatMutation implements Mutation {
  name: string = 'eat';
  targetSelected: boolean = false;
  targetEntity: Entity | null = null;
  targetRadius: number = 10;

  mutate(entity: Entity): void {
    if (!this.targetSelected) {
      const targetEntity = Game.entityManager.getRandomAnt();

      if (targetEntity) {
        this.targetEntity = targetEntity;
        this.targetSelected = true;
        (<Drawable>entity).color = 0xFF0000;
      }
    } else {
      if (this.targetEntity) {
        const { id, x, y, size } = <Living>this.targetEntity;
        const distance = Math.sqrt(
          Math.pow(((<Living>entity).x - x), 2) +
          Math.pow(((<Living>entity).y - y), 2)
        );
        const minSize = (<Living>entity).size / 2 + size / 2;

        if (distance < minSize) {
          Game.entityManager.killAnt(id);
          this.targetSelected = false;
          this.targetEntity = null;
          (<Drawable>entity).color = 0xFF00FF;
        }
      }
    }
  }
}

export default EatMutation;

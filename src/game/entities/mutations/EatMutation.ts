import Game from '../../Game';
import Entity from '../../interfaces/Entity';
import Living from '../../interfaces/Living';
import Mutation from './Mutation';

class EatMutation implements Mutation {
  name: string = 'eat';
  targetSelected: boolean = false;
  targetEntity: Entity | null = null;
  targetRadius: number = 10;

  mutate(entity: Entity): void {
    if (!this.targetSelected) {
      let targetEntity: Entity | null = null;
      if (entity.name === 'enemy') {
        targetEntity = Game.entityManager.getRandomAnt();
      } else if (entity.name === 'ant') {
        targetEntity = Game.entityManager.getRandomFood();
      }

      if (targetEntity) {
        this.targetEntity = targetEntity;
        this.targetSelected = true;
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
          if (entity.name === 'enemy') {
            Game.entityManager.killAnt(id);
          } else if (entity.name === 'ant') {
            const killedFood = Game.entityManager.killFood(id);
            if (killedFood) {
              if (Math.random() > 0.01) {
                Game.entityManager.createAnt(
                 (<Living>entity).x + 10,
                 (<Living>entity).y + 10,
                );
              }
            }
          }
          
          this.targetSelected = false;
          this.targetEntity = null;
        }
      }
    }
  }
}

export default EatMutation;

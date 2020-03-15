import Game from '../../Game';
import Entity from '../../interfaces/Entity';
import Living from '../../interfaces/Living';
import Moving from '../../interfaces/Moving';
import {Targets} from '../../interfaces/Targets';
import Mutation from './Mutation';

class EatMutation implements Mutation {
  name: string = 'eat';
  targetSelected: boolean = false;
  targets: Targets;
  targetRadius: number = 100;

  constructor() {
    this.targets = {
      entities: [],
      nearest: null,
    };
  }

  mutate(entity: Entity): void {
    if (!this.targetSelected) {
      // let targetEntity: Entity | null = null;
      // if (entity.name === 'enemy') {
      //   targetEntity = Game.entityManager.getRandomAnt();
      // } else 
      if (entity.name === 'ant') {
        // targetEntity = Game.entityManager.getFoodNearTo(<Living>entity);
        this.targets = Game.entityManager.getFoodInRangeTo(entity as Living, this.targetRadius);
      }

      if (this.targets.nearest) {
        // this.targetEntity = targetEntity;
        this.targetSelected = true;
      }
    } else {
      // if (this.targetEntity) {
        if (this.targets.entities.length > 0) {
          this.targets.entities.forEach((target) => {
            const { id, x, y, size, mass } = <Living>target; // this.targetEntity;
            const distance = Math.sqrt(
              Math.pow(((<Living>entity).x - x), 2) +
              Math.pow(((<Living>entity).y - y), 2)
            );
            const minSize = (<Living>entity).size + size / 2;
            if (distance < minSize) {
              if (entity.name === 'enemy') {
                Game.entityManager.killAnt(id);
              } else if (entity.name === 'ant') {
                const killedFood = Game.entityManager.killFood(id);
                if (killedFood) {
                  if ((<Living>entity).size < 20) {
                    (<Living>entity).size += mass / 20;
                    (<Living>entity).mass = (<Living>entity).size * 2;
                  }
                  // (<Moving>entity).speed -= ;
                  // if (Math.random() > 0.01) {
                  //   Game.entityManager.createAnt(
                  //    (<Living>entity).x + 10,
                  //    (<Living>entity).y + 10,
                  //   );
                  // }
                }
              }
              
              this.targetSelected = false;
              this.targets.nearest = null;
              // this.targets = {
              //   entities: [],
              //   nearest: null,
              // };
              // this.targetEntity = null;
            }
          });
        }

      // }
    }
  }
}

export default EatMutation;

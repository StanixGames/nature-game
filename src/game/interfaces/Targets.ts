import Entity from './Entity';

export interface Targets {
  entities: Entity[],
  nearest: Entity | null,
}
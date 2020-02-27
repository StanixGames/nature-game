import Entity from '../entities/Entity';

// export interface Producable {
//   // new(type: string)
// }

export abstract class Builder<T extends Entity> {
  protected product?: T;
  protected type?: string;

  abstract create(type: string): Builder<T>;
  abstract build(): T;
}

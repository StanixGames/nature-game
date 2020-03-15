import Living from '../interfaces/Living';

export const entityIntersectsPoint = (entity: Living, x: number, y: number): boolean => {
  return (x > entity.x - entity.size
      && x < entity.x + entity.size
      && y < entity.y - entity.size
      && y > entity.y + entity.size);
}

export const entityInRange = (entity: Living, x: number, y: number, radius: number): boolean => {
  const distange = Math.sqrt(
    Math.pow((entity.x - x), 2) +
    Math.pow((entity.y - y), 2)
  );
  return distange < (radius + entity.size);
}
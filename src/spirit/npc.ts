import Tank from './tank';

export default class Npc extends Tank {
  constructor(
    x: number,
    next_x: number,
    y: number,
    next_y: number,
    direction: string,
    type: string,
    rank: number
  ) {
    super(x, next_x, y, next_y, direction, type, rank);

    this.speed = 1;
  }
}
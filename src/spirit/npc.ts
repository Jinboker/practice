import Tank from './tank';

export default class Npc extends Tank {
  constructor(
    x: number,
    y: number,
    direction: string,
    type: string,
    rank: number
  ) {
    super(x, y, direction, type, rank);

    this.speed = 1;
  }
}
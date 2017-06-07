import Tank from './tank';

export default class Npc extends Tank {
  constructor(
    x: number,
    y: number,
    direction: string,
    rank: number
  ) {
    super(x, y, direction, rank);

    this.speed = 1;
    this.type = 'npc';
  }
}
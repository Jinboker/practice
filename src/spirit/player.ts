import Tank from './tank';
import res from '../data/assets';

const ATTACK_AUD = res.audio.attack;

export default class Player extends Tank {
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

    this.speed = 2;
  }
}
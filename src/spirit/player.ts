import Tank from './tank';
import res from '../data/assets';

const ATTACK_AUD = res.audio.attack;

export default class Player extends Tank {
  constructor(
    x: number,
    y: number,
    direction: string,
    type: string,
    rank: number
  ) {
    super(x, y, direction, type, rank);

    this.speed = 2;
  }
}
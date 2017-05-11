import Mover from './mover';
import res from '../data/assets';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;
const ROAD_TYPE = { 3: 'brick', 4: 'steel', 5: 'home' };

export default class Bullet extends Mover {
  // override
  public distanceToCenter: number;
  public speed: number;

  constructor(
    public x: number,
    public next_x: number,
    public y: number,
    public next_y: number,
    public direction: string,
    public type: string,
    public rank: number
  ) {
    super(type);

    this.speed = this.rank ? 5 : 4;
  }

  // override
  doAfterCollision() {

  }

  // override
  affirmNextPosition() {

  }

  // override
  draw() {

  }
}
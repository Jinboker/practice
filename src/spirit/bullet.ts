import Mover from './mover';
import res from '../data/assets';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;
const ROAD_TYPE = { 3: 'brick', 4: 'steel', 5: 'home' };

export default class Bullet extends Mover {
  // override
  public distanceToCenter: number;
  public speed: number;
  public next_x: number;
  public next_y: number;
  public type: string;

  constructor(
    public x: number,
    public y: number,
    public direction: string,
    public bulletType: string,
    public rank: number,
    public id: number
  ) {
    super();

    this.speed = this.rank ? 5 : 4;
    this.distanceToCenter = 8;
    this.next_x = x;
    this.next_y = y;
    this.type = 'bullet';

    this.resetPosition();
  }

  // 子弹初始输入的坐标是坦克的坐标，因此需要重置一下
  resetPosition() {
    let reset = {
      W: [this.x + 12, this.y],
      A: [this.x, this.y + 12],
      S: [this.x + 12, this.y + 24],
      D: [this.x + 24, this.y + 12]
    };

    [this.x, this.y] = reset[this.direction];
  }

  // override
  hitBarrier() {

  }

  // override
  hitTank() {

  }

  // override
  hitBorder() {

  }

  // override
  doAfterCollision() {

  }

  // override
  affirmPosition() {

  }

  // override
  draw() {

  }
}
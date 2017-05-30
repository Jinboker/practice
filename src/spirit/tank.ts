import Mover from './mover';
import { CXT_ROLE, WHEEL_CHANGE_FREQUENT, OFFSET_X, OFFSET_Y, DIR_NUM } from '../global/const';
import { delayTimeout } from '../util/fn';
import res from '../data/assets';

const SHIELD_IMG = res.img.misc;
const PLAY_IMG = res.img.player;
const NPC_IMG = res.img.npc;
const BORN_IMG = res.img.bonus;

export default class Tank extends Mover {
  // override
  public distanceToCenter: number;
  public speed: number;
  public next_x: number;
  public next_y: number;

  // 轮胎变化相关参数
  private wheelDelay: delayOption;
  private wheelPic: number;

  // 防护罩相关参数
  private shieldDuration: number;
  private shieldPic: number;
  private shieldDelay: delayOption;

  // 出生动画相关参数
  private bornAnimationNum: number;
  private bornPic: number;
  private bornDelay: delayOption;

  protected couldMove: boolean;
  protected beChangeDirection: boolean;

  constructor(
    public x: number, 
    public y: number,
    public direction: string,
    public type: string,
    public rank: number
  ) {
    super();

    this.distanceToCenter = 16;
    this.next_x = x;
    this.next_y = y;
    this.beChangeDirection = false;

    // 轮胎变化相应参数
    this.wheelPic = 0;
    this.wheelDelay = { count: WHEEL_CHANGE_FREQUENT, amount: WHEEL_CHANGE_FREQUENT };

    // 防护罩相关参数
    this.shieldDuration = this.type === 'player' ? 200 : 0;
    this.shieldPic = 0;
    this.shieldDelay = { count: 4, amount: 4 };

    // 出生动画相关参数
    this.bornAnimationNum = 4;
    this.bornPic = 4;
    this.bornDelay = { count: 4, amount: 4 };
  }

  protected getPositionAfterChangeDirection(): number[] {
    let [x, y, directionNum] = [this.x, this.y, DIR_NUM[this.direction]];

    directionNum % 2
      // 此处必须使用math.round进行四舍五入才能避免坦克转弯时候位置变动过大
      ? x = Math.round(x / 16) << 4
      : y = Math.round(y / 16) << 4;

    return [x, y];
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
  affirmPosition() {}
  // this.beChangeDirection ? this.resetPositionIfChangeDirection() : this.moveToNextPosition();

  // 定时改变轮胎图片
  protected changeWheelPic() {
    delayTimeout(this.wheelDelay, () => (this.wheelPic = (+!this.wheelPic) << 5));
  }

  // 绘制防护罩
  private drawShield() {
    if (!this.shieldDuration) return;

    this.shieldDuration --;
    CXT_ROLE.drawImage(SHIELD_IMG, 32 + this.shieldPic, 0, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
    delayTimeout(this.shieldDelay, () => (this.shieldPic = (+!this.shieldPic) << 5));
  }

  // 绘制出生动画
  private drawBornAnimation() {
    CXT_ROLE.drawImage(BORN_IMG, this.bornPic << 5, 64, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
    delayTimeout(this.bornDelay, () => {
      this.bornPic > 0 ? this.bornPic -= 1 : (this.bornPic = 4, this.bornAnimationNum -= 1);
    });
  }

  // 绘制坦克
  private drawTank() {
    let img = this.type === 'player' ? PLAY_IMG : NPC_IMG;

    CXT_ROLE.drawImage(img, this.rank << 5, (DIR_NUM[this.direction] << 6) + this.wheelPic, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
  }

  // override
  draw() {
    this.bornAnimationNum
      ? this.drawBornAnimation()
      : (
        this.affirmPosition(),
        this.drawShield(),
        this.drawTank()
      );
  }
}
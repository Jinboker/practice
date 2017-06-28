import Mover from './mover';
import { delayTimeout } from '../util/fn';
import res from '../data/assets';
import eventBus from '../util/eventBus';
import TankCollisionDetection from '../collision/tankCollisionDetection';
import { CXT_ROLE, WHEEL_CHANGE_FREQUENT, OFFSET_X, OFFSET_Y } from '../global/const';
import { dirNum } from '../global/var';

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
  public type: string;

  // 坦克的id，主要用来匹配子弹
  public id: number;

  // 轮胎变化相关参数
  private wheelDelay: DelayOption;
  private wheelPic: number;

  // 防护罩相关参数
  protected shieldDuration: number;
  private shieldPic: number;
  private shieldDelay: DelayOption;

  // 出生动画相关参数
  private bornAnimationNum: number;
  private bornPic: number;
  private bornDelay: DelayOption;

  // 子弹相关
  protected fireDelay: number;
  public bulletAlive: boolean;

  protected detectionCollision: TankCollisionDetection;
  protected couldMove: boolean;
  protected beChangeDirection: boolean;

  constructor(
    public x: number,
    public y: number,
    public direction: string,
    public rank: number
  ) {
    super();

    this.distanceToCenter = 16;
    this.next_x = x;
    this.next_y = y;
    this.beChangeDirection = false;

    // 生成坦克ID
    this.id = Math.ceil(new Date().getTime() * Math.random());

    // 轮胎变化相应参数
    this.wheelPic = 0;
    this.wheelDelay = { count: WHEEL_CHANGE_FREQUENT, amount: WHEEL_CHANGE_FREQUENT };

    // 防护罩相关参数
    this.shieldDuration = 0;
    this.shieldPic = 0;
    this.shieldDelay = { count: 4, amount: 4 };

    // 出生动画相关参数
    this.bornAnimationNum = 4;
    this.bornPic = 4;
    this.bornDelay = { count: 4, amount: 4 };

    // 子弹相关
    this.fireDelay = 25;
    this.bulletAlive = false;

    // 实例化坦克的碰撞检测
    this.detectionCollision = new TankCollisionDetection();
  }

  protected getPositionAfterChangeDirection(): number[] {
    this.beChangeDirection = false;

    const directionNum = dirNum[this.direction];
    let [x, y] = [this.x, this.y];

    directionNum % 2
      // 此处必须使用math.round进行四舍五入才能避免坦克转弯时候位置变动过大
      ? x = Math.round(x / 16) << 4
      : y = Math.round(y / 16) << 4;

    return [x, y];
  }

  // override
  protected doAfterCollision() {
  }

  // override
  protected affirmPosition() {}

  // 生成子弹
  protected newBullet() {
    const bulletInfo = {
      x: this.x,
      y: this.y,
      direction: this.direction,
      rank: this.rank,
      id: this.id,
      type: this.type
    };

    // 事件在DrawBullet类中响应
    eventBus.dispatch('new-bullet', bulletInfo);
  }

  // 是否生成子弹
  protected produceBullet() {}

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
    const img = this.type === 'player' ? PLAY_IMG : NPC_IMG;

    CXT_ROLE.drawImage(img, this.rank << 5, (dirNum[this.direction] << 6) + this.wheelPic, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
  }

  // override
  public draw() {
    this.bornAnimationNum
      ? this.drawBornAnimation()
      : (
        this.produceBullet(),
        this.affirmPosition(),
        this.drawShield(),
        this.drawTank()
      );
  }
}
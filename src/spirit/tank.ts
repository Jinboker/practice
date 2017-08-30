import Mover from './mover';
import res from '../data/assets';
import eventBus from '../util/eventBus';
import TankCollisionCheck from '../checkCollision/tankCollisionCheck';
import { delayTimeout } from '../util/fn';
import { CXT_ROLE, OFFSET_X, OFFSET_Y, directionNum } from '../global';

const SHIELD_IMG = res.img.misc;
const PLAY_IMG = res.img.player;
const NPC_IMG = res.img.npc;
const BORN_IMG = res.img.bonus;

export default class Tank extends Mover {
  // override
  protected distanceToCenter: number;
  protected speed: number;
  protected nextX: number;
  protected nextY: number;
  protected type: string;
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

  // 完全停止任何动作
  protected stop: boolean;

  // 碰撞检测
  protected collisionCheck: TankCollisionCheck;

  // 是否需要改变方向
  protected beChangeDirection: boolean;

  constructor(
    public x: number,
    public y: number,
    public direction: string,
    public rank: number
  ) {
    super();

    this.beChangeDirection = false;
    this.distanceToCenter = 16;
    this.nextX = x;
    this.nextY = y;

    // 生成坦克ID
    this.id = Math.ceil(new Date().getTime() * Math.random());

    // 轮胎变化相应参数
    this.wheelPic = 0;
    this.wheelDelay = { count: 5, amount: 5 };

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
    this.collisionCheck = new TankCollisionCheck(`${this.type}Tank`, this.id);
  }

  /**
   * 如果坦克需要转弯，那么获取转弯后的坐标
   * @returns {[number,number]} 坐标
   */
  protected getCoordAfterChangeDirection(): number[] {
    let [x, y] = [this.x, this.y];

    directionNum[this.direction] % 2
      // 此处必须使用math.round进行四舍五入才能避免坦克转弯时候位置变动过大
      ? x = Math.round(x / 16) << 4
      : y = Math.round(y / 16) << 4;

    return [x, y];
  }

  /**
   * 生成新的子弹
   */
  protected produceNewBullet() {
    const { x, y, direction, rank, id, type } = this;
    const bulletInfo = { x, y, direction, rank, id, type };

    // 事件在DrawBullet类中响应
    eventBus.dispatch('new-bullet', bulletInfo);
  }

  /**
   * 被子类重写
   * 检查是否需要生成新的子弹
   */
  protected whetherProduceBullet() {}

  /**
   * 每5次游戏渲染循环改变一次轮胎的图片
   */
  protected changeWheelPic() {
    delayTimeout(this.wheelDelay, () => (this.wheelPic = (+!this.wheelPic) << 5));
  }

  /**
   * 绘制防护罩
   */
  private drawShield() {
    if (!this.shieldDuration) return;

    this.shieldDuration --;
    CXT_ROLE.drawImage(SHIELD_IMG, 32 + this.shieldPic, 0, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
    delayTimeout(this.shieldDelay, () => (this.shieldPic = (+!this.shieldPic) << 5));
  }

  /**
   * 绘制出生动画
   */
  private drawBornAnimation() {
    CXT_ROLE.drawImage(BORN_IMG, this.bornPic << 5, 64, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
    delayTimeout(this.bornDelay, () => {
      this.bornPic > 0 ? this.bornPic -= 1 : (this.bornPic = 4, this.bornAnimationNum -= 1);
    });
  }

  /**
   * 绘制坦克
   */
  private drawTank() {
    const img = this.type === 'player' ? PLAY_IMG : NPC_IMG;

    CXT_ROLE.drawImage(img, this.rank << 5, (directionNum[this.direction] << 6) + this.wheelPic, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
  }

  /**
   * 被子类重写
   * 确定坦克在本次渲染循环结束后的最终位置
   */
  protected affirmFinalCoord() {}

  /**
   * 渲染精灵
   */
  public renderSpirit() {
    this.bornAnimationNum
      ? this.drawBornAnimation()
      : (
        this.whetherProduceBullet(),
        this.affirmFinalCoord(),
        this.drawShield(),
        this.drawTank()
    );
  }
}

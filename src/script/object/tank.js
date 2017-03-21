import {Mover} from './mover';
import {res} from '../data';
import {delay} from '../comm';
import {controller} from '../control';
import {roadMap} from '../map';
import {CXT_ROLE, DIR, OFFSET_X, OFFSET_Y, WHEEL_CHANGE_FREQUENT, FIRE_MIN_FREQUENT, brickStatus} from '../variables';

const SHIELD_IMG = res.img.misc;
const PLAY_IMG = res.img.player;
const NPC_IMG = res.img.npc;
const BORN_IMG = res.img.bonus;
const ATTACK_AUD = res.audio.attack;

class Tank extends Mover {
  constructor(x, y, direction, type, index) {
    super(x, y, direction, type, index);

    this.shieldDuration = 200;
    this.shieldPic = 0;
    this.shieldDelay = {count: 4};

    this.wheelPic = 0;
    this.wheelDelay = {count: WHEEL_CHANGE_FREQUENT}; 

    this.bornAnimationNum = 4;
    this.bornPic = 4;
    this.bornDelay = {count: 4};
  
    this.fireDelay = 0;
    this.bulletAlive = false;
  }

  hasBarrier(row, col) {
    let roadType = roadMap[row][col];
    let brickStatusArr = brickStatus[row * 28 + col];
    
    // roadType 为0表示无障碍，1为冰，3位砖块
    if (roadType === 1) {
      // TODO
      return true;
    }

    if (roadType === 3 && brickStatusArr) {
      let directionNum = DIR[this.direction];
      let indexInBrick = null;
      let passAble = null;

      if (directionNum % 2) {
        indexInBrick = (this.next_x + (+!(directionNum - 1) * 32) - (col << 4)) >> 3;
        passAble = !brickStatusArr[1][indexInBrick] && !brickStatusArr[0][indexInBrick]; 
      } else {
        indexInBrick = (this.next_y + (directionNum >> 1) * 32 - (row << 4)) >> 3;
        passAble = brickStatusArr[indexInBrick].every(ele => (ele === 0));
      }

      return passAble;
    }

    return (roadType <= 1);
  }

  // 坦克改变方向后需要重置位置
  resetPosition() {
    let [x, y, directionNum] = [this.x, this.y, DIR[this.direction]];

    directionNum % 2
      // 此处必须使用math.round进行四舍五入才能避免坦克转弯时候位置变动过大
      ? x = Math.round(x / 16) << 4
      : y = Math.round(y / 16) << 4;

    return [x, y];
  }

  changeWheels() {
    delay(this.wheelDelay, () => (this.wheelPic = (+!this.wheelPic) << 5));
  }

  newBullet() {
    if (this.bulletAlive) {return;};

    ATTACK_AUD.play();
    this.bulletAlive = true;
    this.fireDelay = FIRE_MIN_FREQUENT;
    controller.receiveMessage('newBullet', this.x, this.y, this.direction, 'bullet', this.index, this.grade);
  }

  drawImgParam() {
    return [32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32];
  }

  drawShield(drawImgParam) {
    if (!this.shieldDuration) {return;}

    this.shieldDuration --;
    CXT_ROLE.drawImage(SHIELD_IMG, 32 + this.shieldPic, 0, ...drawImgParam);
    delay(this.shieldDelay, () => (this.shieldPic = (+!this.shieldPic) << 5));
  }

  drawBornAnimation(drawImgParam) {
    CXT_ROLE.drawImage(BORN_IMG, this.bornPic << 5, 64, ...drawImgParam);
    delay(this.bornDelay, () => {
      this.bornPic > 0 ? this.bornPic -= 1 : (this.bornPic = 4, this.bornAnimationNum -= 1);
    });
  }

  drawTank(drawImgParam) {
    let img = this.type === 'player' ? PLAY_IMG : NPC_IMG;
    
    CXT_ROLE.drawImage(img, this.grade << 5, (DIR[this.direction] << 6) + this.wheelPic, ...drawImgParam);
  }

  // 最终暴露给外部调用的接口
  draw() {
    let drawImgParam = this.drawImgParam();

    this.bornAnimationNum
      ? this.drawBornAnimation(drawImgParam)
      : (this.move(), this.drawShield(drawImgParam), this.drawTank(drawImgParam));
  }
}

export {Tank};

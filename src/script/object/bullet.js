import { Mover } from './mover';
import { res } from '../data';
import { roadMap } from '../map';
import { DIR, CXT_ROLE, CXT_BG, OFFSET_X, OFFSET_Y, brickStatus } from '../variables';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;
const ROAD_TYPE = {
  3: 'brick',
  4: 'steel',
  5: 'home'
};
const HIT_BRICK = {
  W() {},
  A() {},
  S() {},
  D() {}
};

let [currentRow, currentCol] = [0, 0];

class Bullet extends Mover {
  constructor (x, y, direction, type, index, grade) {
    super(x, y, direction, type, index);

    // 根据坦克的等级确定子弹的速度
    this.speed = grade ? 5 : 4;
    this.grade = grade;
    this.collisionCheckIndex = 1;

    this.init();
  }

  init() {
    let resetDirection = {
      W: [this.x + 12, this.y],
      A: [this.x, this.y + 12],
      S: [this.x + 12, this.y + 24],
      D: [this.x + 24, this.y + 12]
    };

    [this.x, this.y] = resetDirection[this.direction];
  }

  // 用来清除16厚度的障碍，包括砖块和钢筋，视子弹等级而定 
  clearBigBarrier() {
    roadMap[currentRow][currentCol] = 0;
    CXT_BG.clearRect(OFFSET_X + (currentCol << 4), OFFSET_Y + (currentRow << 4), 16, 16);
  }

  // 子弹等级最低时清除8个厚度的障碍，只包括砖块
  clearSmallBarrier(index) {
    CXT_BG.clearRect(OFFSET_X + (currentCol << 4), OFFSET_Y + (currentRow << 4) + 8 * index, 16, 8);
  }

  hitBrick(index) {
    if (this.direction === 'W') { 
      if ((this.next_y - currentRow * 16) >= 8) {
        if (brickStatus[index][1][+!this.collisionCheckIndex]) {
          this.clearSmallBarrier(1);
          brickStatus[index][1][+!this.collisionCheckIndex] = 0;
          return false;
        } else {
          return true
        }
      } else {
        if (brickStatus[index][0][+!this.collisionCheckIndex]) {
          brickStatus[index][0][+!this.collisionCheckIndex] = 0;
          this.clearSmallBarrier(0);
          return false;
        } else {
          return true;
        }
      }
    }
  }

  brick() { 
    if (this.grade <= 1) {
      let index = currentRow * 28 + currentCol;

      return brickStatus[index]
        ? this.hitBrick(index)
        : (brickStatus[index] = [[1, 1], [1, 1]]) && this.hitBrick(index);
    } else {
      this.clearBigBarrier();
    }
  }

  steel() {
    this.grade === 3 ? this.clearBigBarrier() : ATTACK_OVER_AUD.play();
    return false;
  }

  home() {
    console.log('home');
    return false;
  }

  hasBarrier(row, col) {
    let roadType = roadMap[row][col];

    // 子弹每次检测会循环调用hasBarrier两次，可通过此索引确定子弹具体打在块的哪个部位
    //只针对子弹等级最低的情况，因为此时子弹一次只能打掉8个像素厚的砖块
    this.collisionCheckIndex = +!this.collisionCheckIndex

    // roadType的0， 1， 2分为代表空，冰，流，子弹可以直接通过
    if (roadType <= 2) {return true;}

    [currentRow, currentCol] = [row, col];
    return this[ROAD_TYPE[roadType]]();
  }

  draw() {
    this.move();
    CXT_ROLE.drawImage(BULLET_IMG, DIR[this.direction] << 3, 0, 8, 8, this.x + OFFSET_X, this.y + OFFSET_Y, 8, 8);
  }

  moveState() {
    return [true, false];
  }
}

export { Bullet };

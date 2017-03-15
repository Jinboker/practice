import { Mover } from './mover';
import { res } from '../data';
import { roadMap } from '../map';
import { DIR, CXT_ROLE, CXT_BG, OFFSET_X, OFFSET_Y, brickStatus } from '../variables';

const BULLET_IMG = res.img.misc;
const ATTACK_OVER_AUD = res.audio.attackOver;
const ROAD_TYPE = {3: 'brick', 4: 'steel', 5: 'home'};

let orderIndex = 0;
let currentRow, currentCol, currentRow_y, currentCol_x;

class Bullet extends Mover {
  constructor (x, y, direction, type, index, grade) {
    super(x, y, direction, type, index);

    // 根据坦克的等级确定子弹的速度
    this.speed = grade ? 5 : 4;
    this.grade = grade;

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
    console.log('nnnnnnnnn');
    roadMap[currentRow][currentCol] = 0;
    CXT_BG.clearRect(OFFSET_X + currentCol_x, OFFSET_Y + currentRow_y, 16, 16);
  }

  // 子弹等级最低时清除8个厚度的障碍，只包括砖块
  clearSmallBarrier(index, type) {
    let [increase_x, increase_y, range_x, range_y] = type === 'isCol' 
      ? [currentCol_x + 8 * index, currentRow_y, 8, 16]
      : [currentCol_x, currentRow_y + 8 * index, 16, 8];
    
    if (brickStatus[index] === [[0, 0], [0, 0]]) {
      this.clearBigBarrier();
    } else {
      CXT_BG.clearRect(OFFSET_X + increase_x, OFFSET_Y + increase_y, range_x, range_y);
    }
  }

  hitBrick(index) {
    let indexInBrick, firstKey, secondKey, type;
    let directionNum = DIR[this.direction];

    // 子弹每次检测会循环调用hasBarrier两次，可通过此索引确定子弹具体打在块的哪个部位
    // 只针对子弹等级最低的情况，因为此时子弹一次只能打掉8个像素厚的砖块，第一次是1，第二次是0
    // 记住每次调用orderIndex算的都是另外一个16*16的砖块
    orderIndex = +!orderIndex;

    if (directionNum % 2) {
      // 根据方向对比子弹与砖块碰撞点的坐标之间的差值，确定子弹在砖块中的位置
      indexInBrick = +(Math.abs(this.next_x + (+!(directionNum - 1)) * 8 - currentCol_x) >= 8);
      [firstKey, secondKey, type] = [orderIndex, indexInBrick, 'isCol'];
    } else {
      indexInBrick = +(Math.abs(this.next_y + (directionNum >> 1) * 8 - currentRow_y) >= 8);
      [firstKey, secondKey, type] = [indexInBrick, orderIndex, 'isRow'];
    }

    let passAble = !brickStatus[index][firstKey][secondKey]; 
    
    if (!passAble) {
      this.clearSmallBarrier(indexInBrick, type);
      if (directionNum % 2) {
        brickStatus[index][firstKey][secondKey] = 0;
        brickStatus[index][+!firstKey][secondKey] = 0; 
      } else {
        brickStatus[index][firstKey] = [0, 0];
      }
    }

    let clearBrick = brickStatus[index].every(ele => {
      return ele.every(i => !i);
    });

    clearBrick && this.clearBigBarrier(); 

    return passAble;
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

    // roadType的0， 1， 2分为代表空，冰，流，子弹可以直接通过
    if (roadType <= 2) {return true;}

    [currentRow, currentCol, currentRow_y, currentCol_x] = [row, col, row << 4, col << 4];
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

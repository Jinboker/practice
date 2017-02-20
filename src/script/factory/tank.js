import { Mover } from './mover';
import { res } from '../data';
import { delay } from '../comm';
import { CXT_ROLE, SCREEN_L, OFFSET_X, OFFSET_Y, WHEEL_CHANGE_FREQUENT, SHIELD_CHANGE_FREQUENT } from '../const';
import { roadMap } from '../map';

const SHIELD_IMG = res.img.misc;

class Tank extends Mover {
  constructor(x, y, direction, type) {
    super(x, y, direction, type);

    this.hasShield = true;
    this.shieldPic = 0;
    this.shieldDuration = 200;
    this.shieldDelayNum = SHIELD_CHANGE_FREQUENT;

    this.wheelPic = 0;
    this.wheelDelayNum = WHEEL_CHANGE_FREQUENT;
  }

  barrierCollision(position) {
    let [x, y] = position;
    let direction = this.direction;
    let coord_x = parseInt(x / 16, 10);
    let coord_y = parseInt(y / 16, 10);
    let collisionCoordinate = [];

    switch(true) {
      case direction === 'W':
        if (this.y === 0) {return false;}
        collisionCoordinate = [[coord_x, coord_y], [coord_x + 1, coord_y]];
        break;
      case direction === 'A':
        if (this.x === 0) {return false;}
        collisionCoordinate = [[coord_x, coord_y], [coord_x, coord_y]];
        break;
      case direction === 'S':
        if (this.y === SCREEN_L - 32) {return false;}
        collisionCoordinate = [[coord_x, coord_y + 1], [coord_x + 1, coord_y + 1]];
        break;
      case direction === 'D':
        if (this.x === SCREEN_L - 32) {return false;}
        collisionCoordinate = [[coord_x + 1, coord_y], [coord_x + 1, coord_y + 1]];
        break;
      default: break;
    };

    return collisionCoordinate.every((ele) => {
      switch (roadMap[ele[1]][ele[0]]) {
        case 0: return true; break;
        // 砖块钢筋河流老家无法通过
        case 1: case 2: case 4: case 5: return false; break;
        // 冰路中间有相应的代码（默认就是3了）
        default: return true; break;
      }
    });
  }

  shield() {
    if (!this.hasShield) { return; }

    if (this.shieldDuration > 0) {
      this.shieldDuration --;
      this.shieldDelayNum = delay(this.shieldDelayNum, SHIELD_CHANGE_FREQUENT, () => {
        this.shieldPic = +! this.shieldPic;
      });
      CXT_ROLE.drawImage(SHIELD_IMG, 32 + this.shieldPic * 32, 0, 32, 32, this.x + OFFSET_X, this.y + OFFSET_Y, 32, 32);
    } else {
      this.hasShield = false;
      this.shieldDuration = 200;
    }
  }

  // 坦克改变方向后需要重置位置
  resetPosition() {
    let x = this.x;
    let y = this.y;

    this.direction === 'W' || this.direction === 'S'
      ? y = Math.round(y / 16) * 16
      : x = Math.round(x / 16) * 16;

    return [x, y];
  }

  changeWheels() {
    this.wheelDelayNum = delay(this.wheelDelayNum, WHEEL_CHANGE_FREQUENT, () => {
      this.wheelPic = +!this.wheelPic;
    });
  }
}

export { Tank };

import { TANK_WIDTH, BULLET_WIDTH, SCREEN_L, inputKey } from '../variables';
import { roadMap } from '../map';

const [halfTank, halfBullet] = [TANK_WIDTH >> 1, BULLET_WIDTH >> 1];
const movePosition = {
  W(speed) { return [0, -speed]; },
  D(speed) { return [speed, 0]; },
  S(speed) { return [0, speed]; },
  A(speed) { return [-speed, 0]; }
};

class Mover {
  constructor(x, y, direction, type) {
    this.x = x;
    this.y = y;
    this.direction = direction;    // W A S D
    this.type = type;
  }

  // 如果换方向，是不用检测是否会跟障碍物撞到一起的
  isCollision(changeDirection, position) {
    if (changeDirection) {
      return false;
    } {
      return !this.barrierCollision(position);
    }
    // return this.tankCollision() && this.barrierCollision(position);
  }

  barrierCollision(position) {
    let collisionDot = this.confirmCollisionDot(position);

    if (!collisionDot) { return false; }

    return collisionDot.every((ele) => {
      let [row, col] = [ele[1] >> 4, ele[0] >> 4];

      switch (roadMap[row][col]) {
        case 0: return true; break;
        // 砖块钢筋河流老家无法通过
        case 1: case 2: case 4: case 5: return false; break;
        // 冰路中间有相应的代码（默认就是3了）
        default: return true; break;
      }
    });
  }

  tankCollision() {
    return false;
  }

  confirmCollisionDot(position) {
    let direction = this.direction;
    let distance = this.type !== 'bullet' ? halfTank : halfBullet;
    // the center of the object
    let [x, y] = [position[0] + distance, position[1] + distance];

    switch(true) {
      case direction === 'W':
        if (this.y === 0) {return false;}
        return [[x - 16, y - distance], [x, y - distance]];
        break;
      case direction === 'A':
        if (this.x === 0) {return false;}
        return [[x - distance, y - 16], [x - distance, y]];
        break;
      case direction === 'S':
        if (this.y === SCREEN_L - distance * 2) {return false;}
        return [[x - 16, y + distance], [x, y + distance]];
        break;
      case direction === 'D':
        if (this.x === SCREEN_L - distance * 2) {return false;}
        return [[x + distance, y - 16], [x + distance, y]];
        break;
      default: break;
    };
  }

  move() {
    let [moveAble, changeDirectionAble] = this.moveState();

    if (!moveAble) {return;}

    let position = changeDirectionAble
      ? this.resetPosition()
      : this.toNextPosition();

    if (!this.isCollision(changeDirectionAble, position)) {
      changeDirectionAble && (this.direction = inputKey.directionKey);
      [this.x, this.y] = position;
    }
  }

  toNextPosition() {
    let offsetArr = movePosition[`${this.direction}`](this.speed);

    return [this.x + offsetArr[0], this.y + offsetArr[1]];
  }
}

export { Mover };

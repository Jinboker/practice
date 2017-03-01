import { TANK_WIDTH, BULLET_WIDTH, SCREEN_L, inputKey } from '../variables';
import { roadMap } from '../map';

const movePosition = {
  W(speed) { return [0, -speed]; },
  D(speed) { return [speed, 0]; },
  S(speed) { return [0, speed]; },
  A(speed) { return [-speed, 0]; }
};
const collisionPoint = {
  W(x, y, distance) {return [[x - 16, y - distance], [x, y - distance]];},
  A(x, y, distance) {return [[x - distance, y - 16], [x - distance, y]];},
  S(x, y, distance) {return [[x - 16, y + distance], [x, y + distance]];},
  D(x, y, distance) {return [[x + distance, y - 16], [x + distance, y]];}
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
    let collisionDot = this.confirmCollisionPoint(position);

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

  confirmCollisionPoint(position) {
    let direction = this.direction;
    // half width of tank and bullet
    let distanceToCenter = this.type !== 'bullet' ? 16 : 4;  
    // the center of the object
    let [x, y] = [position[0] + distanceToCenter, position[1] + distanceToCenter];

    return collisionPoint[direction](x, y, distanceToCenter);
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

import { TANK_WIDTH, BULLET_WIDTH, SCREEN_L, inputKey } from '../variables';
import { roadMap } from '../map';
import { controller } from '../control';

const movePosition = {
  W: speed => [0, -speed],
  D: speed => [speed, 0],
  S: speed => [0, speed],
  A: speed => [-speed, 0]
};
const collisionPoint = {
  W: (x, y, distance) => [[x - 16, y - distance], [x, y - distance]],
  A: (x, y, distance) => [[x - distance, y - 16], [x - distance, y]],
  S: (x, y, distance) => [[x - 16, y + distance], [x, y + distance]],
  D: (x, y, distance) => [[x + distance, y - 16], [x + distance, y]]
};

class Mover {
  constructor(x, y, direction, type, index) {
    this.x = x;
    this.y = y;
    this.direction = direction;    // W A S D
    this.type = type;
    this.index = index;
    this.alive = true;
    this.distanceToCenter = type !== 'bullet' ? 16 : 4;
    this.next_x = null;
    this.next_y = null;
    this.borderCollision = {
      W: () => (this.next_y <= 0),
      A: () => (this.next_x <= 0), 
      S: () => (this.next_y >= SCREEN_L - this.distanceToCenter * 2),
      D: () => (this.next_x >= SCREEN_L - this.distanceToCenter * 2) 
    };
  }

  confirmCollisionPoint() {
    let distance = this.distanceToCenter;

    return collisionPoint[this.direction](this.next_x + distance, this.next_y + distance, distance);
  }

  barrierCollision() {
    let collisionDot = this.confirmCollisionPoint();

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

  // 如果换方向，是不用检测是否会跟障碍物撞到一起的
  isCollision(changeDirection) {
    if (changeDirection) {
      return false;
    } else {
      return this.borderCollision[this.direction]()
          || !this.barrierCollision()
          || this.tankCollision();
    }
  }

  tankCollision() {
    return false;
  }

  toNextPosition() {
    let offsetArr = movePosition[`${this.direction}`](this.speed);

    return [this.x + offsetArr[0], this.y + offsetArr[1]];
  }

  move() {
    let [moveAble, changeDirectionAble] = this.moveState();

    if (!moveAble) {return;}

    [this.next_x, this.next_y] = changeDirectionAble
      ? this.resetPosition()
      : this.toNextPosition();
    
    if (!this.isCollision(changeDirectionAble)) {
      changeDirectionAble && (this.direction = inputKey.directionKey);
      [this.x, this.y] = [this.next_x, this.next_y];
    } else {
      if (this.type === 'bullet') {
       controller.receiveMessage('bulletDie', this.index); 
       this.alive = false;
      } 
    }
  }
}

export { Mover };

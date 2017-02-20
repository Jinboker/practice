import { inputKey } from '../var';
import { TANK_WIDTH, BULLET_WIDTH } from '../const';

let [halfTank, halfBullet] = [TANK_WIDTH >> 1, BULLET_WIDTH >> 1];
let movePosition = {
  W(speed) { return [0, -speed]; },
  D(speed) { return [speed, 0]; },
  S(speed) { return [0, speed]; },
  A(speed) { return [-speed, 0]; }
};

class Mover {
  constructor(x, y, direction, type) {
    this.coordinate;
    this.x = x * 32;
    this.y = y * 32;
    this.direction = direction;    // W A S D
    this.type = type;
    this.rank = 0;
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

  tankCollision() {
    return false;
  }

  sureCenter(position, type) {
    let direction = this.direction;
    let distance = type !== 'bullet' ? halfTank : halfBullet;
    // the center of the object
    let [x, y] = [position[0] + distance, position[1] + distance];

    switch(true) {
      case direction === 'W':
        return [x - 16, y - distance, x, y - distance];
        break;
      case direction === 'A':
        return [x + distance, y -16, x + distance, y];
        break;
      case direction === 'S':
        return [x - 16, y + distance, x, y + distance];
        break;
      case direction === 'D':
        return [x - distance, y - 16, x - distance, y];
        break;
      default: break;
    };
  }

  move() {
    console.log(this.y);
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

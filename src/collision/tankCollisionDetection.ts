import CollisionDetection from './collisionDetection';
import { roadMap } from "../map/affirmRoadMap";
import {brickStatus, dirNum} from '../global/var';
import { DIR_NUM } from '../global/const';

const allCollisionType = ['border', 'barrier'];

export default class TankCollisionDetection extends CollisionDetection {
  direction: string;
  x: number;
  y: number;

  constructor(public distanceToCenter: number) {
    super();
  }

  // 检查是否碰到边界
  borderCollision() {
    return {
      isCollision: this.isTouchBorder[this.direction](),
      info: ['border']
    }
  }

  // 获取每一个碰撞坐标点最后的碰撞信息
  getItemBarrierCollisionInfo(row: number, col: number): [boolean, string] {
    const roadType = roadMap[row][col];
    const brickStatusArr: number[][] = brickStatus[row * 28 + col];

    // roadType 为0表示无障碍，1为冰，3为砖块
    if (roadType === 1) {
      // TODO
      return [false, roadType];
    }

    if (roadType === 3 && brickStatusArr) {
      const directionNum = DIR_NUM[this.direction];

      let indexInBrick = 0;
      let passAble = false;

      if (directionNum % 2) {
        indexInBrick = (this.x + (+!(directionNum - 1) * 32) - (col << 4)) >> 3;
        passAble = brickStatusArr.some(ele => (ele[indexInBrick] === 0));
      } else {
        indexInBrick = (this.y + (directionNum >> 1) * 32 - (row << 4)) >> 3;
        passAble = brickStatusArr[indexInBrick].some(ele => (ele === 0));
      }

      return [passAble, roadType];
    }

    return [roadType > 1, roadType];
  }

  // 检测是否碰到砖块之类的障碍物
  barrierCollision() {
    const collisionCoordinateGroup = this.getCollisionCoordinateGroupWidthBarrier();
    const collisionInfoArr = collisionCoordinateGroup.map(
      ele => this.getItemBarrierCollisionInfo(ele[1] >> 4, ele[0] >> 4)
    );
    const isCollision = collisionInfoArr.some(ele => ele[0]);

    return {
      isCollision: isCollision,
      info: ['barrier']
    }
  }

  // 检测是否碰到其他坦克
  tankCollision() {
    return {
      isCollision: false,
      info: []
    }
  }

  // 检测是否碰到奖励

  getCollisionInfo(direction: string, x: number, y: number): collisionInfo {
    [this.direction, this.x, this.y] = [direction, x, y];

    let collisionInfo = { isCollision: false };

    allCollisionType.every(ele => {
      // 获取碰撞信息，如碰撞，则保存相应的信息
      let _info = this[`${ele}Collision`]();

      _info.isCollision && (collisionInfo = _info);
      return !_info.isCollision;
    });

    return collisionInfo;
  }
}

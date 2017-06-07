import eventBus from '../../util/eventBus';
import Bullet from '../../spirit/bullet';

export default class DrawBullet {
  private bulletArr: Bullet[];

  constructor() {
    this.bulletArr = [];

    this.event();
  }

  event() {
    // 事件在Tank类中dispatch
    eventBus.on('new-bullet', (bulletInfo: bulletInfo) => {
      const { x, y, direction, type, rank, id } = bulletInfo;

      this.bulletArr.push(new Bullet(x, y, direction, type, rank, id));
    });
  }

  draw() {

  }
}
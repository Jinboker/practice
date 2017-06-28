import eventBus from '../../util/eventBus';
import Bullet from '../../spirit/bullet';
import { spirit } from '../../global/var';

export default class DrawBullet {
  constructor() {
    spirit.bulletArr = [];

    this.event();
  }

  private event() {
    // 事件在Tank类中dispatch
    eventBus.on('new-bullet', (bulletInfo: BulletInfo) => {
      const { x, y, direction, type, rank, id } = bulletInfo;
      let a: Mover = new Bullet(x, y, direction, rank, type, id);

      spirit.bulletArr.push(new Bullet(x, y, direction, rank, type, id));
    });
  }

  public draw() {
    const bulletArr = spirit.bulletArr;

    if (!bulletArr.length) return;

    for (let i = 0, flag = true; i < bulletArr.length; flag ? i++ : i) {
      const bulletObj = bulletArr[i];

      bulletObj.draw();
      flag = bulletObj.alive || !spirit.bulletArr.splice(i, 1);
    }
  }
}
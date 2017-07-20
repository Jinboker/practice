import eventBus from '../../util/eventBus';
import Bullet from '../../spirit/bullet';
import { spiritCollection } from '../../global';

export default class DrawBullet {
  constructor() {
    spiritCollection.bulletArr = [];

    this.event();
  }

  private event() {
    // 事件在Tank类中dispatch
    eventBus.on('new-bullet', (bulletInfo: BulletInfo) => {
      const { x, y, direction, type, rank, id } = bulletInfo;

      spiritCollection.bulletArr.push(new Bullet(x, y, direction, rank, type, id));
    });
  }

  public draw() {
    const bulletArr = spiritCollection.bulletArr;

    if (!bulletArr.length) return;

    for (let i = 0, flag = true; i < bulletArr.length; flag ? i++ : i) {
      const bulletObj = bulletArr[i];

      bulletObj.renderSpirit();
      flag = bulletObj.alive || !spiritCollection.bulletArr.splice(i, 1);
    }
  }
}
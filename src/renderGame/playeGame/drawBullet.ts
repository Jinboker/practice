import eventBus from '../../util/eventBus';
import Bullet from '../../spirit/bullet';
import SpiritCollect from '../../spirit/spiritCollect';

export default class DrawBullet {
  constructor() {
    SpiritCollect.bulletArr = [];

    this.event();
  }

  event() {
    // 事件在Tank类中dispatch
    eventBus.on('new-bullet', (bulletInfo: bulletInfo) => {
      const { x, y, direction, type, rank, id } = bulletInfo;

      SpiritCollect.bulletArr.push(new Bullet(x, y, direction, type, rank, id));
    });
  }

  draw() {
    let bulletArr = SpiritCollect.bulletArr;

    if (!bulletArr.length) return;

    for (let i = 0, flag = true; i < bulletArr.length; flag ? i++ : i) {
      const bulletObj = bulletArr[i];

      bulletObj.draw();
      flag = bulletObj.alive || !SpiritCollect.bulletArr.splice(i, 1);
    }
  }
}
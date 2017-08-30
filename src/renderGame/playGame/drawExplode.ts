import eventBus from '../../util/eventBus';
import Explode from '../../spirit/explode';
import { affirmCenterCoord } from '../../util/fn';
import { gameParam, spiritCollection } from '../../global';

export default class DrawExplode {
  constructor() {
    spiritCollection.explodeArr = [];
    this.event();
  }

  private event() {
    // 事件在Bullet类中dispatch
    eventBus.on('new-explode', (tankCoord: number[]) => {
      const [x, y] = affirmCenterCoord(tankCoord, 16);
      spiritCollection.explodeArr.push(new Explode(x, y, 'big'));
    });
  }

  public draw() {
    const explodeArr = spiritCollection.explodeArr;

    if (!explodeArr.length) return;

    for (let i = 0, flag = true; i < explodeArr.length; flag ? i++ : i) {
      const explodeObj = explodeArr[i];

      explodeObj.renderExplode();
      flag = explodeObj.alive || !spiritCollection.explodeArr.splice(i, 1);
    }
  }
}

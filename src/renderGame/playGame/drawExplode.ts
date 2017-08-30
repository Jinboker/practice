import eventBus from '../../util/eventBus';
import Explode from '../../spirit/explode';
import { affirmCenterCoord } from '../../util/fn';
import { spiritCollection } from '../../global';

export default class DrawExplode {
  constructor() {
    spiritCollection.explodeArr = [];
    this.event();
  }

  private event() {
    // 事件在Bullet类中dispatch
    eventBus.on('new-explode', (coord: number[], type: string) => {
      const [x, y] = affirmCenterCoord(coord, type === 'big' ? 16 : 4);
      spiritCollection.explodeArr.push(new Explode(x, y, type));
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

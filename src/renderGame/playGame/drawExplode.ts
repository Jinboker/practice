import Explode from '../../spirit/explode';
import { gameParam, spiritCollection } from '../../global';

export default class DrawExplode {
  constructor() {
    spiritCollection.explodeArr = [];
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

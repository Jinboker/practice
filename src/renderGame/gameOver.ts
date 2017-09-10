import { gameParam, spiritCollection } from '../global';

export default class {
  constructor() {
    // 清空所有的精灵对象
    ['tank', 'bullet', 'explode']
      .forEach(ele => (spiritCollection[`${ele}Arr`] = []));
  }

  public draw() {
    console.log(11111);
  }
}

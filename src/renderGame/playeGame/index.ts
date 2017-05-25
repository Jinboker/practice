import { SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE } from '../../global/const';
import DrawTank from './drawTank';
// import DrawBullet from './drawBullet';
// import DrawExplode from './drawBullet';

export default class {
  private drawTank: DrawTank;

  constructor() {
    this.drawTank = new DrawTank();
  }

  draw() {
    CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);

    this.drawTank.draw();
  }
}
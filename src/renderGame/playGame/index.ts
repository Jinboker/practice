import DrawTank from './drawTank';
import DrawBullet from './drawBullet';
import DrawExplode from './drawExplode';
import { SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE } from '../../global';

export default class {
  private drawType: string[];
  private drawTank: DrawTank;
  private drawBullet: DrawBullet;
  private drawExplode: DrawExplode;

  constructor() {
    this.drawType = ['drawTank', 'drawBullet', 'drawExplode'];
    this.drawTank = new DrawTank();
    this.drawBullet = new DrawBullet();
    this.drawExplode = new DrawExplode();
  }

  public draw() {
    CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);

    this.drawType.forEach(ele => this[ele].draw());
  }
}

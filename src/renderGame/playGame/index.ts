import DrawTank from './drawTank';
import DrawBullet from './drawBullet';
import DrawExplode from './drawExplode';
import { cleanCxt } from '../../util/fn';

export default class {
  public state: string;
  private drawType: string[];
  private drawTank: DrawTank;
  private drawBullet: DrawBullet;
  private drawExplode: DrawExplode;

  constructor() {
    this.drawType = ['drawTank', 'drawBullet', 'drawExplode'];
    this.drawTank = new DrawTank();
    this.drawBullet = new DrawBullet();
    this.drawExplode = new DrawExplode();
    this.state = 'new';
  }

  public draw() {
    cleanCxt('role', 'misc');

    this.drawType.forEach(ele => this[ele].draw());

    if (this.state === 'over') {
      console.log(123123);
    }
  }
}

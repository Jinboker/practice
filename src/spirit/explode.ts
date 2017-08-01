import res from '../data/assets';
import { CXT_ROLE, OFFSET_X, OFFSET_Y } from '../global';

const BOOM_IMG = res.img.boom;

export default class Explode {
  private x: number;
  private y: number;
  private picX: number;
  private picY: number;
  private range: number;
  public alive: boolean;

  constructor(
    private centerX: number,
    private centerY: number,
    private type: string
  ) {
    this.resetData();
  }

  private resetData() {
    [this.range, this.picX, this.picY] = this.type === 'small' ? [32, 16, 16] : [32, 128, 0];
    this.x = this.centerX + this.range / 2 + OFFSET_X;
    this.y = this.centerY + this.range / 2 + OFFSET_Y;
  }

  public renderExplode() {
    let { x, y, range, picX, picY } = this;

    CXT_ROLE.drawImage(BOOM_IMG, picX, picY, range, range, x, y, range, range);
  }
}

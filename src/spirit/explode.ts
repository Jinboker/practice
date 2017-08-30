import res from '../data/assets';
import { delayTimeout } from '../util/fn';
import { CXT_MISC, OFFSET_X, OFFSET_Y } from '../global';

const BOOM_IMG = res.img.boom;

export default class Explode {
  private x: number;
  private y: number;
  private picX: number;
  private picY: number;
  private range: number;
  private delayCount: number;
  private picPosition: number;
  private picDelay: DelayOption;
  public alive: boolean;

  constructor(
    private centerX: number,
    private centerY: number,
    private type: string
  ) {
    this.alive = true;
    this.picPosition = 0;
    this.picDelay = { count: 2, amount: 2 };
    this.resetData();
  }

  private resetData() {
    [this.range, this.picX, this.picY, this.delayCount] = this.type === 'small'
      ? [32, 16, 16, 2]
      : [64, 128, 0, 3];

    this.x = this.centerX - this.range / 2 + OFFSET_X;
    this.y = this.centerY - this.range / 2 + OFFSET_Y;
  }

  public renderExplode() {
    let { x, y, range, picX, picY } = this;

    CXT_MISC.drawImage(BOOM_IMG, picX + 64 * this.picPosition, picY, range, range, x, y, range, range);

    delayTimeout(this.picDelay, () => {
      this.picPosition++;
      (this.picPosition === this.delayCount) && (this.alive = false);
    });
  }
}

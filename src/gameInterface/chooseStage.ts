import res from '../data/assets';
import { CXT_BG, CXT_MISC, CXT_H, CXT_W, OFFSET_X, OFFSET_Y, SCREEN_L } from '../global/const';
import { gameParam } from '../global/var';
import { delayTimeout, cleanCxt } from '../util/fn';
import drawMap from '../map/drawMap';

const START_AUD = res.audio.start;
const HALF_SCREEN = CXT_H >> 1;

export default class {
  private process: string;
  private enterPlay: delayOption;
  private startFoldCurtain: boolean;
  private halfMaskWidth: number;

  constructor(private couldChangeStage: boolean) {
    this.process = 'unfoldCurtain';
    this.enterPlay = { count: 80, amount: 80 };
    this.startFoldCurtain = false;
    this.halfMaskWidth = 0;
  }

  private unfoldCurtain() {
    CXT_BG.save();
    CXT_BG.fillStyle = '#666';
    CXT_BG.fillRect(0, 0, CXT_W, this.halfMaskWidth);
    CXT_BG.fillRect(0, CXT_H - this.halfMaskWidth, CXT_W, this.halfMaskWidth);
    CXT_BG.restore();

    this.halfMaskWidth <= HALF_SCREEN
      ? this.halfMaskWidth += 15
      : this.process = 'waitChangeStage';
  }

  private waitChangeStage() {
    CXT_MISC.clearRect(180, 210, 220, 40);
    CXT_MISC.fillText(`STAGE  ${gameParam.stageNum}`, 180, 218);

    if (!this.couldChangeStage) {
      this.process = 'foldCurtain';
    }
  }

  private foldCurtain() {
    if (this.startFoldCurtain) {
      CXT_MISC.clearRect(OFFSET_X + 208 - this.halfMaskWidth, OFFSET_Y, 2 * this.halfMaskWidth, SCREEN_L);

      this.halfMaskWidth < 208
        ? this.halfMaskWidth += 15
        : console.log('aaa');
    } else {
      delayTimeout(this.enterPlay, () => {
        CXT_BG.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
        cleanCxt('misc');
        CXT_MISC.save();
        CXT_MISC.fillStyle = '#666';
        CXT_MISC.fillRect(0, 0, CXT_W, CXT_H);
        CXT_MISC.restore();
        drawMap(gameParam.stageNum - 1);
        this.startFoldCurtain = true;
        this.halfMaskWidth = 0;
      });
    }
  }

  public draw() {
    this[this.process]();
  }
}

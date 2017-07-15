import { gameParam } from '../global/var';
import { delayTimeout, cleanCxt, keyboardOperate } from '../util/fn';
import { CXT_BG, CXT_MISC, CXT_H, CXT_W, OFFSET_X, OFFSET_Y, SCREEN_L, MAX_STAGE } from '../global/const';
import res from '../data/assets';
import drawMap from '../map/drawMap';
import eventBus from '../util/eventBus';
import controller from '../ctrlCenter/ctrlCenter';

const START_AUD = res.audio.start;
const HALF_SCREEN = CXT_H >> 1;
const HALF_ARENA = SCREEN_L >> 1;

export default class {
  private process: string;
  private enterPlay: DelayOption;
  private startFoldCurtain: boolean;
  private halfMaskWidth: number;
  private operate: Operate;

  constructor(private couldChangeStage: boolean) {
    this.process = 'unfoldCurtain';
    this.enterPlay = { count: 80, amount: 80 };
    this.startFoldCurtain = false;
    this.halfMaskWidth = 0;
    this.operate = {
      W() { gameParam.stageNum = gameParam.stageNum > 1 ? gameParam.stageNum - 1 : MAX_STAGE; },
      S() { gameParam.stageNum = gameParam.stageNum < MAX_STAGE ? gameParam.stageNum + 1 : 1; },
      H: () => { (this.process = 'foldCurtain') && START_AUD.play(); }
    };
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

    this.couldChangeStage ? keyboardOperate(this.operate) : this.process = 'foldCurtain';
  }

  private foldCurtain() {
    if (this.startFoldCurtain) {
      CXT_MISC.clearRect(OFFSET_X + 208 - this.halfMaskWidth, OFFSET_Y, 2 * this.halfMaskWidth, SCREEN_L);

      this.halfMaskWidth < HALF_ARENA
        ? this.halfMaskWidth += 15
        : (
          controller.receiveMsg('playGame'),
          // 移除事件总线中的相关事件
          eventBus.off(['new-bullet'])
        );
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
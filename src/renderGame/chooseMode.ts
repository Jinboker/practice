import res from '../data/assets';
import controller from '../ctrlCenter/ctrlCenter';
import { CXT_BG, CXT_H, inputParam } from '../global';
import { delayTimeout, cleanCxt, keyboardOperate } from '../util/fn';

const MIN_Y = 285;
const MAX_Y = 345;
const UI_IMG = res.img.ui;
const PLAYER_IMG = res.img.player;
const changeWheel: DelayOption = { count: 5, amount: 5 };
const operate = {
  W() { indicatorPosition = indicatorPosition > MIN_Y ? indicatorPosition - 30 : MAX_Y; },
  S() { indicatorPosition = indicatorPosition < MAX_Y ? indicatorPosition + 30 : MIN_Y; },
  H() {
    (indicatorPosition - MIN_Y) / 30 === 2
      ? controller.receiveMsg('construct')
      : controller.receiveMsg('enterStage', true);
  }
};

let wheelPic = 0;
let screenTopPosition = CXT_H;
let indicatorPosition = MIN_Y;

export default class {
  private touchTop: boolean;

  constructor() {
    this.touchTop = false;
  }

  private drawAfterTouchTop() {
    delayTimeout(changeWheel, () => (wheelPic = (+!wheelPic) * 32));
    CXT_BG.clearRect(140, 260, 32, 120);
    CXT_BG.drawImage(PLAYER_IMG, 0, 64 + wheelPic, 32, 32, 140, indicatorPosition, 32, 32);
    keyboardOperate(operate);
  }

  private drawBeforeTouchTop() {
    // 如果按下了H键，则直接运动到顶部
    inputParam['H'] ? screenTopPosition = 75 : screenTopPosition -= 3;

    cleanCxt('bg');
    CXT_BG.save();
    CXT_BG.fillStyle = 'white';
    CXT_BG.fillText('I-         00   HI-20000', 70, screenTopPosition);
    CXT_BG.fillText('NORMAL MODE', 190, screenTopPosition + 220);
    CXT_BG.fillText('CRAZY MODE', 190, screenTopPosition + 250);
    CXT_BG.fillText('CONSTRUCTION', 190, screenTopPosition + 280);
    CXT_BG.drawImage(UI_IMG, 0, 0, 376, 160, 70, screenTopPosition + 25, 376, 160);
    CXT_BG.restore();

    if (screenTopPosition <= 75) {
      this.touchTop = true;
      inputParam.isPressed = false;
    }
  }

  public draw() {
    this.touchTop ? this.drawAfterTouchTop() : this.drawBeforeTouchTop();
  }
}

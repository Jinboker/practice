import { cxtBg } from '../init/initElement';
import { HEIGHT, keyBoard } from '../var';
import { pics } from '../data/assets';
import { DelayTimeout, cleanCxt, keyboardOperate } from '../utils';

const delayTimeout = new DelayTimeout();
const PLAYER = pics.player as HTMLImageElement;
const UI = pics.ui as HTMLImageElement;
const pointerMaxY = 345;
const pointerMinY = 285;
const operate = {
  W() { animateTopY = animateTopY > pointerMinY ? animateTopY - 30 : pointerMaxY; },
  S() { animateTopY = animateTopY < pointerMaxY ? animateTopY + 30 : pointerMinY; },
  H() {
    console.log('jjjj');
    // (animateTopY - MIN_Y) / 30 === 2
    //   ? controller.receiveMsg('construct')
    //   : controller.receiveMsg('enterStage', true);
  }
};

let wheelPic = 0;
let pointerY = pointerMinY;
let animateTopY = HEIGHT;s

class NewGame {
  private isTouchTop = false;

  handleTouchedTop() {
    delayTimeout.delay('wheel', 5, () => wheelPic = (+!wheelPic) * 32);
    cxtBg.clearRect(140, 260, 32, 120);
    cxtBg.drawImage(PLAYER, 0, 64 + wheelPic, 32, 32, 140, pointerY, 32, 32);
    keyboardOperate(operate);
  }

  handleBeforeTouchTop() {
    // 如果按下了H键，则直接运动到顶部
    keyBoard.H ? animateTopY = 75 : animateTopY -= 3;

    cleanCxt('Bg');
    cxtBg.save();
    cxtBg.fillStyle = 'white';
    cxtBg.fillText('I-         00   HI-20000', 70, animateTopY);
    cxtBg.fillText('NORMAL MODE', 190, animateTopY + 220);
    cxtBg.fillText('CRAZY MODE', 190, animateTopY + 250);
    cxtBg.fillText('CONSTRUCTION', 190, animateTopY + 280);
    cxtBg.drawImage(UI, 0, 0, 376, 160, 70, animateTopY + 25, 376, 160);
    cxtBg.restore();

    if (animateTopY <= 75) {
      this.isTouchTop = true;
      keyBoard.isPressed = false;
    }
  }

  draw() {
    this.isTouchTop ? this.handleTouchedTop() : this.handleBeforeTouchTop();
  }
}

export default NewGame;

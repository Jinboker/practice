import { res, npcData } from '../data';
import { drawMap } from '../map';
import { controller } from '../control';
import { doAfterPressKey, delay, cleanCxt } from '../comm';
import { Player } from '../object/player';
import { CXT_H, CXT_W, CXT_BG, CXT_MISC, OFFSET_X, OFFSET_Y, SCREEN_L, state, inputKey, game, object } from '../variables';

const HALF_CURTAIN = CXT_H >> 1;
const MAX_STAGE = npcData.length;

let process = 0;
let halfCurtain = 0;
let halfPlayScreen = 0
let enterPlayDelay = {count: 0};

let operate = {
  W() { game.stage = game.stage > 1 ? game.stage - 1 : MAX_STAGE; },
  S() { game.stage = game.stage < MAX_STAGE ? game.stage + 1 : 1; },
  H() { 
    res.audio.start.play();
    enterPlayDelay.count = 80;
    process = 2;
  }
};

function chooseStage() {
  switch(process) {
    case 0:
      CXT_BG.save();
      CXT_BG.fillStyle = '#666';
      CXT_BG.fillRect(0, 0, CXT_W, halfCurtain);
      CXT_BG.fillRect(0, CXT_H - halfCurtain, CXT_W, halfCurtain);
      CXT_BG.restore();

      halfCurtain <= HALF_CURTAIN ? halfCurtain += 15 : process = 1;
      break;
    case 1:
      CXT_MISC.clearRect(180, 210, 220, 40);
      CXT_MISC.fillText(`STAGE  ${game.stage}`, 180, 218);

      if (state.stage === 'changeAble') {
        doAfterPressKey(operate);
      } else {
        console.log(2);
      }
      break;
    case 2:
      delay(enterPlayDelay, () => {
        console.log('nnnn');
        CXT_BG.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
        cleanCxt('misc');
        CXT_MISC.save();
        CXT_MISC.fillStyle = '#666';
        CXT_MISC.fillRect(0, 0, CXT_W, CXT_H);
        CXT_MISC.restore();
        drawMap(game.stage - 1);
        process = 3;
      }, 1);
      break;
    case 3:
      CXT_MISC.clearRect(OFFSET_X + 208 - halfPlayScreen, OFFSET_Y, 2 * halfPlayScreen, SCREEN_L);

      if (halfPlayScreen < 208) {
        halfPlayScreen += 15;
      } else {
        controller.receiveMessage('playGame', 'fight');
        object.tank[0] = new Player(128, 384, 'W', 'player', 0);
      }
      break;
    default: break;
  };
}

export { chooseStage };

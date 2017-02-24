import { SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE } from '../const';
import { obj } from '../var';

function playGame() {
  CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
  obj.player.draw();
}

export { playGame };
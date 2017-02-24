import { SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE } from '../const';
import { drawPlayer, drawNpc } from './drawTank';
import { drawBullet } from './drawBullet';

function playGame() {
  CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
  drawPlayer();
  drawBullet();
}

export { playGame };
import {SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE, game} from '../../variables';
import {DrawTank} from './drawTank';
import {DrawBullet} from './drawBullet';
import {DrawExplode} from './drawExplode';

let drawTank, drawBullet, drawExplode;

function playGame() {
  CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);

  game.playGameInit && ([game.playGameInit, drawTank, drawBullet, drawExplode] = 
                        [false, new DrawTank(), new DrawBullet()], new DrawExplode());

  drawTank.draw();
  drawBullet.draw();
  drawExplode.draw();
}

export {playGame};

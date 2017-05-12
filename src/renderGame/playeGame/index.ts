import { SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE } from '../../global/const';
// import DrawTank from './drawTank';
// import DrawBullet from './drawBullet';
// import DrawExplode from './drawBullet';
import Player from '../../spirit/player';

export default class {
  private player: Player;

  constructor() {
    this.player = new Player(128, 384, 'W', 'player', 0);
  }

  draw() {
    CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
  }
}
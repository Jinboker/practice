import Player from '../../spirit/player';

// 第一个npc延迟30个循环出生，后面的延迟150个循环
const NEW_TANK_FREEQUENCE = 150;

export default class DrawTank {
  private player: Player;

  constructor() {
    this.player = new Player(128, 384, 'W', 'player', 0);
  }

  draw() {
    this.player.draw();
  }
}
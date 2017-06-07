import Player from '../../spirit/player';
import Npc from '../../spirit/npc';
import { delayTimeout } from '../../util/fn';
import { gameParam } from '../../global/var';

export default class DrawTank {
  private player: Player;
  private npc: Npc[];
  private setNewNpcDelay: delayOption;

  public canBornNewNpc: boolean;

  private bornNewNpc: boolean;
  private npcArrIndex: number;
  private npcIndex: number;

  constructor() {
    // 玩家
    this.player = new Player(128, 384, 'W', 'player', 0);
    // NPC出生的延迟
    this.setNewNpcDelay = { count: 30, amount: 150 };
    // 是否可以有新的坦克出生
    this.canBornNewNpc = true;
    this.bornNewNpc = true;
    // NPC出生的索引
    this.npcArrIndex = 1;
    // 第几个NPC
    this.npcIndex = 1;
  }

  draw() {
    // 绘制玩家
    this.player.draw();
    // 如果正存活的NPC数目小于约定的最大数，那么出生新的NPC
    (this.npc.length < gameParam.npcMax) && delayTimeout(this.setNewNpcDelay, () => {
    });
  }
}
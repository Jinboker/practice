import Player from '../../spirit/player';
// import Npc from '../../spirit/npc';
// import npcData from '../../data/npc';
import eventBus from '../../util/eventBus';
import { delayTimeout } from '../../util/fn';
import { gameParam, spiritCollection } from '../../global';

export default class DrawTank {
  private setNewNpcDelay: DelayOption;
  private npcIndex: number;

  constructor() {
    // 玩家
    spiritCollection.tankArr[0] = new Player(128, 384, 'W', 0);
    // NPC出生的延迟
    this.setNewNpcDelay = { count: 30, amount: 150 };
    // 第几个NPC
    this.npcIndex = 1;

    this.event();
  }

  private event() {
    eventBus.on('bullet-die', (bulletId: number) => {
      spiritCollection.tankArr.find(ele =>
        (ele && ele.id === bulletId && Boolean(ele.bulletAlive = false)));
    });
  }

  public draw() {
    // 如果正存活的NPC数目小于约定的最大数，且坦克未全部出生，那么出生新的NPC
    // if (
    //   spirit.tankArr.length < gameParam.npcMax &&
    //   this.npcIndex <= gameParam.maxStage
    // ) {
    //   delayTimeout(this.setNewNpcDelay, () => {
    //     const [x, y] = [(this.npcIndex % 3) * 192, 0];
    //     const rank = npcData[gameParam.stageNum - 1][this.npcIndex];
    //
    //     spirit.tankArr.push(new Npc(x, y, 'S', rank));
    //     this.npcIndex++;
    //   });
    // }
    // 绘制坦克
    spiritCollection.tankArr.forEach(ele => ele && ele.renderSpirit());
  }
}

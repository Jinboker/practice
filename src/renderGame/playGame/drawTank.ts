import Npc from '../../spirit/npc';
import npcData from '../../data/npc';
import Player from '../../spirit/player';
import eventBus from '../../util/eventBus';
import { inputParam } from '../../global';
import { delayTimeout } from '../../util/fn';
import { gameParam, spiritCollection } from '../../global';

export default class DrawTank {
  private setNewNpcDelay: DelayOption;
  private npcIndex: number;

  constructor() {
    spiritCollection.tankArr = [];
    // 玩家
    spiritCollection.tankArr[0] = new Player(128, 384, 'W', 0);
    // NPC出生的延迟
    this.setNewNpcDelay = { count: 30, amount: 150 };
    // 第几个NPC
    this.npcIndex = 1;
    this.event();
  }

  /**
   * 坦克的相关事件
   */
  private event() {
    eventBus.on('bullet-die', (bulletId: number) => {
      spiritCollection.tankArr.find(ele =>
        (ele && ele.id === bulletId && Boolean(ele.bulletAlive = false)));
    });

    eventBus.on('tank-die', (index: number) => {
      const tankArr = spiritCollection.tankArr;

      tankArr.splice(index, 1);

      if (!index) {
        tankArr.unshift(new Player(128, 384, 'W', 0));
        // 玩家坦克死掉以后必须要重置该参数，不然刷新后会保持死亡前的方向
        inputParam.directionKey = '';
      }
    });
  }

  /**
   * 绘制所有的坦克
   */
  public draw() {
    // 如果正存活的NPC数目小于约定的最大数，且坦克未全部出生，那么出生新的NPC
    if (
      spiritCollection.tankArr.length < gameParam.aliveNpcMax &&
      this.npcIndex <= gameParam.npcNumMax
    ) {
      delayTimeout(this.setNewNpcDelay, () => {
        const [x, y] = [(this.npcIndex % 3) * 192, 0];
        const rank = npcData[gameParam.stageNum - 1][this.npcIndex];

        spiritCollection.tankArr.push(new Npc(x, y, 'S', rank));
        this.npcIndex++;
      });
    }
    // 绘制坦克
    spiritCollection.tankArr.forEach(ele => ele && ele.renderSpirit());
  }
}

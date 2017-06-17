import Player from '../../spirit/player';
import Npc from '../../spirit/npc';
import npcData from '../../data/npc';
import eventBus from '../../util/eventBus';
import SpiritCollect from '../../spirit/spiritCollect';
import { delayTimeout } from '../../util/fn';
import { gameParam, spirit } from '../../global/var';

export default class DrawTank {
  private setNewNpcDelay: delayOption;
  private npcIndex: number;

  constructor() {
    // 玩家
    spirit.tankArr[0] = new Player(128, 384, 'W', 0);
    SpiritCollect.player = new Player(128, 384, 'W', 0);
    // NPC
    SpiritCollect.npcArr = [];
    // NPC出生的延迟
    this.setNewNpcDelay = { count: 30, amount: 150 };
    // 第几个NPC
    this.npcIndex = 1;

    this.event();
  }

  event() {
    eventBus.on('bullet-die', (id: number, bulletType: string) => {
      // 如果子弹死掉，那么找出对应的坦克，将其表示相应子弹存活的标志置为假
      bulletType === 'player'
        ? spirit.tankArr[0] && (spirit.tankArr[0].bulletAlive = false)
        : spirit.tankArr.every((ele, index) =>
            index === 0 || !(ele.id === id && Boolean(ele.bulletAlive = false)));
      // bulletType === 'player'
      //   ? SpiritCollect.player && (SpiritCollect.player.bulletAlive = false)
      //   : SpiritCollect.npcArr.every(ele =>
      //     !(ele.id === id && Boolean(ele.bulletAlive = false)));
    });
  }

  draw() {
    // 绘制坦克
    spirit.tankArr.forEach(ele => ele.draw());

    // 绘制玩家
    SpiritCollect.player.draw();
    // 如果正存活的NPC数目小于约定的最大数，且坦克未全部出生，那么出生新的NPC
    if (
      SpiritCollect.npcArr.length < gameParam.npcMax - 1 &&
      this.npcIndex <= gameParam.maxStage
    ) {
      delayTimeout(this.setNewNpcDelay, () => {
        const [x, y] = [(this.npcIndex % 3) * 192, 0];
        const rank = npcData[gameParam.stageNum - 1][this.npcIndex];

        SpiritCollect.npcArr.push(new Npc(x, y, 'S', rank));
        this.npcIndex++;
      });
    }
    // 绘制NPC
    SpiritCollect.npcArr.forEach(ele => ele.draw());
  }
}
import {NPC_MAX_NUM, obj} from '../../variables';
import {delayTimeout} from '../../comm';
import {Player} from '../../object/player';
import {Npc} from '../../object/npc';

// 第一个npc延迟30个循环出生，后面的延迟150个循环
const NEW_TANK_FREQUENCE = 150;

class DrawTank {
  constructor() {
    this.setNewNpcTimeout = 30;
    this.bornNewNpc = true;
    this.npcArrIndex = 1;
    this.npcNum = 1;
  }

  newTank(index) {
    obj.tank[index] = index
      ? new Npc((this.npcNum % 3) * 192, 0, 'S', 'npc', 0)
      : new Player(128, 384, 'W', 'player', 0);
  }

  draw() {
    let tankArr = obj.tank;

    tankArr[0] === null && this.newTank(0);

    this.setNewNpcTimeout = delayTimeout(this.setNewNpcTimeout, () => {
      this.bornNewNpc = true;
      this.newTank(this.npcArrIndex);
      return void 0;
    });

    tankArr.forEach((ele, index) => {
      ele && ele.alive
        ? ele.draw()
        : (
          ele = null,
          this.bornNewNpc 
          && !this.setNewNpcTimeout 
          && (this.npcNum <= NPC_MAX_NUM)
          && ([this.setNewNpcTimeout, this.npcArrIndex, this.bornNewNpc, this.npcNum] = 
              [NEW_TANK_FREQUENCE, index, false, this.npcNum + 1])
        );
    });
  }
}

export {DrawTank};

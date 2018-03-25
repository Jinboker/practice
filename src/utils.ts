import { cxtBg, cxtMisc, cxtRole } from './init/initElement';
import { HEIGHT, WIDTH, keyBoard } from './var';

// 延时函数
export class DelayTimeout {
  delayList: Object[] = [];

  delay(type: string, count: number, fn: () => void) {
    if (!this.delayList[type]) {
      this.delayList[type] = {count};
    }

    if (this.delayList[type].count) {
      this.delayList[type].count -= 1;
    } else {
      fn();
      delete this.delayList[type];
    }
  }
}

// 清除画布
type CleanType = 'Role' | 'Bg' | 'Misc' | 'all';
export function cleanCxt(...types: CleanType[]) {
  const typeArr = types[0] === 'all' ? ['Role', 'Bg', 'Misc'] : types;
  const cxt = { cxtBg, cxtMisc, cxtRole };

  typeArr.forEach(ele => cxt[`cxt${ele}`].clearRect(0, 0, WIDTH, HEIGHT));
}

// 处理对应按键按下的操作
export function keyboardOperate(operate: Operate) {
  if (keyBoard.isPressed && typeof operate[keyBoard.pressedKey] === 'function') {
    keyBoard.isPressed = false;
    operate[keyBoard.pressedKey]();
  }
}

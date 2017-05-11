import { CXT_ROLE, CXT_BG, CXT_MISC, CXT_W, CXT_H } from '../global/const';
import { inputParam } from '../global/var';

export function delayTimeout(option: delayOption, fn: any) {
  let count = option.count;

  count ? count -= 1 : (count = option.amount) && fn();
  option.count = count;
}

export function cleanCxt(...types: string[]) {
  let typeArr = types[0] === 'all' ? ['role', 'bg', 'misc'] : types;
  let cxt = { CXT_ROLE, CXT_BG, CXT_MISC };

  typeArr.forEach(ele => cxt[`CXT_${ele.toUpperCase()}`].clearRect(0, 0, CXT_W, CXT_H));
}

export function keyboardOperate(operate: operate) {
  if (inputParam.isPressed && typeof operate[inputParam.pressedKey] === 'function') {
    inputParam.isPressed = false;
    operate[inputParam.pressedKey]();
  }
}

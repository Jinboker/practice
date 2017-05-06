import { CXT_ROLE, CXT_BG, CXT_MISC, CXT_W, CXT_H } from '../global/const';
import { inputParam } from '../global/var';

/**
 * 延时函数
 * @param [number] time 需要延时的时间
 * @param [function] fn 延时到时后需要执行的函数，如果需要循环，那么fn应该返回一个需要延时的时间，否则返回一个undefined
 * return [number] 延迟的时间，每次执行该函数后减1
 */
function delayTimeout1(time: number, fn: any): number {
  // if (time) {
  //   time -= 1;
  //   !time && fn();
  // }
  //
  return time;
}

export function delayTimeout(option: delayOption, fn: any) {
  let count = option.count;

  count ? count -= 1 : (count = option.amount) && fn();
  option.count = count;
}

export function cleanCxt(...types: string[]) {
  let typeArr = types[0] === 'all' ? ['role', 'bg', 'misc'] : types;
  let cxt = { CXT_ROLE, CXT_BG, CXT_MISC };

  typeArr.forEach(ele => {
    cxt[`CXT_${ele.toUpperCase()}`].clearRect(0, 0, CXT_W, CXT_H);
  });
}

export function keyboardOperate(operate: operate) {
  if (inputParam.isPressed && typeof operate[inputParam.pressedKey] === 'function') {
    inputParam.isPressed = false;
    operate[inputParam.pressedKey]();
  }
}

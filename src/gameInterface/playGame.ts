import { SCREEN_L, OFFSET_X, OFFSET_Y, CXT_ROLE } from '../global/const';

export default class {
  constructor() {
  }

  draw() {
    CXT_ROLE.clearRect(OFFSET_X, OFFSET_Y, SCREEN_L, SCREEN_L);
  }
}
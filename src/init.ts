import { CXT_BG, CXT_MISC } from './global/const';

export default function gameInit() {
  CXT_BG.font = '15px prstart';
  CXT_BG.fillStyle = '#000';
  CXT_BG.textBaseline = 'top';

  CXT_MISC.font = '20px prstart';
  CXT_MISC.fillStyle = '#000';
  CXT_MISC.textBaseline = 'top';
}
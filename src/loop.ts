import { gameParam } from './global/var';

export default function loop() {
  gameParam.renderUI.draw();
  window.requestAnimationFrame(loop);
}
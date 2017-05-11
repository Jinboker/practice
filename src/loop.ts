import { gameParam } from './global/var';

export default function loop() {
  gameParam.renderContent.draw();
  window.requestAnimationFrame(loop);
}
import renderGame from './renderGame/render';

export default function loop() {
  renderGame();
  window.requestAnimationFrame(loop);
}
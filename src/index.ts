import '../style/css.scss';
import init from './init';

function loop() {
  console.log(1);
  window.requestAnimationFrame(loop);
}

(() => {
  init();
  loop();
})();
import '../style/css.scss';
import init from './init';

function loop() {
  console.log(17979);
  window.requestAnimationFrame(loop);
}

(() => {
  init();
  loop();
})();
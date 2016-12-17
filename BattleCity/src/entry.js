import { init } from './scripts/init';

// 游戏入口
window.onload = function () {
  init();
  console.log(typeof init);
  // gameLoop();
}
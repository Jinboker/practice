import { object } from '../variables';

let bulletArr = object.bullet;

function drawBullet() {
  if (bulletArr.length === 0) { return; }

  bulletArr.forEach((ele) => {
    ele.draw();
  });
}

export { drawBullet };

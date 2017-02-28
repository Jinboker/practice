import { object } from '../variables';

let bulletArr = object.bullet;

function drawBullet() {
  if (bulletArr.length === 0) { return; }

  bulletArr.forEach((ele, index) => {
    (index === 0) && ele.draw();
  });
}

export { drawBullet };

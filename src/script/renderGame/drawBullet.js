import { object } from '../variables';

let bulletArr = object.bullet;

function drawBullet() {
  if (bulletArr.length === 0) { return; }

  bulletArr.forEach(() => {
    console.log(1);
  });
}

export { drawBullet };

import { object } from '../variables';

function drawBullet() {
  let bulletArr = object.bullet;

  bulletArr.forEach(ele => {
    ele.alive ? ele.draw() : ele = null;
  }); 
}

export { drawBullet };

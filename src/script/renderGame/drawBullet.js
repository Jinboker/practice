import { object } from '../variables';

function drawBullet() {
  let bulletArr = object.bullet;

  if (!bulletArr.length) {return;}

  bulletArr.forEach((ele, index) => {
    ele.alive ? ele.draw() : bulletArr.splice(index, 0);
  }); 
}

export { drawBullet };

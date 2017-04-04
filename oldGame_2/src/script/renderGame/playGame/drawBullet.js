import {obj} from '../../variables';

class DrawBullet {
  constructor() {

  }

  draw() {
    let bulletArr = obj.bullet;

    if (!bulletArr.length) {return;}

    bulletArr.forEach((ele, index) => {
      ele.alive ? ele.draw() : bulletArr.splice(index, 0);
    });
  }
}

// function drawBullet() {
//   let bulletArr = obj.bullet;

//   if (!bulletArr.length) {return;}

//   bulletArr.forEach((ele, index) => {
//     ele.alive ? ele.draw() : bulletArr.splice(index, 0);
//   });
// }

export {DrawBullet};

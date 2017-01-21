let moveIncrement = {
  W_key: speed => {
    return [speed, 0];
  },
  D_key: speed => {
    return [speed, 0];
  },
  S_key: speed => {
    return [0, speed];
  },
  A_key: speed => {
    return [-speed, 0];
  }
};

function nextPosition (x, y, direction, speed) {
  let offsetArr = moveIncrement[`${direction}_key`](speed);

  return [x + offsetArr[0], y + offsetArr[1]];
}

export { nextPosition };
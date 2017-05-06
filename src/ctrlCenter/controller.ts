let listeners = {};

listeners['newGame'] = () => {

}

listeners['enterStage'] = () => {

}

listeners['playGame'] = () => {

}

listeners['thisStageOver'] = () => {

}

listeners['newBullet'] = () => {

}

listeners['newBullet'] = () => {

}

listeners['bulletDie'] = () => {

}

let controller = (() => {
  let receiveMsg = <T>(topic: string, ...args: Array<T>) => listeners[topic](args);

  return { receiveMsg };
})();

export default controller;

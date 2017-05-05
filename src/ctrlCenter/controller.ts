function newGame() {
}

function enterStage(mode: string) {
}

function playGame(mode: string) {
}

function thisStageOver(mode: string) {}

function newBullet(param: any) {}

function bulletDie(index: number) {}

let controller = (() => {
  let operations = {
    newGame() {newGame();},
    enterStage(mode: string) {enterStage(mode)},
    playGame(mode: string) {playGame(mode);},
    thisStageOver(mode: string) {thisStageOver(mode)},
    newBullet(param: any) {newBullet(param)},
    bulletDie(index: number) {bulletDie(index)}
  };

  let receiveMsg = (...arg: string[]) => {
    let msg = Array.prototype.shift.call(arg);

    operations[msg](arg);
  };

  return { receiveMsg };
})();

export default controller;
let gameState = {
  // chooseMode, enterStage, playGame, getScore
  gameInterfaceState: 'chooseMode',
  // chooseStage, noChooseStage
  enterStageState: 'chooseStage',
  // normal, construct
  enterGameState: '',
  // nextStage, gameOver
  getScoreState: ''
};

export { gameState };
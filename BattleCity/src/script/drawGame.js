import { state } from './var';

function drawMode () {

}

function drawStage () {

}

function drawPlay () {

}

function drawOver () {

}

function drawGame () {
  switch (state.gameState) {
    case 'mode': drawMode(); break;
    case 'stage': drawStage(); break;
    case 'play': drawPlay(); break;
    case 'over': drawOver(); break;
    default: break;
  }
}

export { drawGame };
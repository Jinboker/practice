import './index.css';
import initElement from './init/initElement';
import initKeyboardEvent from './init/initKeyboardEvent';
import startGame from './init/startGame';

window.onload = (): void => {
  initElement();
  initKeyboardEvent();
  startGame();
};

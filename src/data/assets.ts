import json from '../../assets/resource.json';

let res = {
  img: {
    bonus: document.createElement('img'),
    boom: document.createElement('img'),
    brick: document.createElement('img'),
    misc: document.createElement('img'),
    npc: document.createElement('img'),
    player: document.createElement('img'),
    ui: document.createElement('img')
  },
  audio: {
    count: document.createElement('audio'),
    attack: document.createElement('audio'),
    attackOver: document.createElement('audio'),
    eat: document.createElement('audio'),
    explode: document.createElement('audio'),
    pause: document.createElement('audio'),
    start: document.createElement('audio'),
    bomb: document.createElement('audio'),
    life: document.createElement('audio'),
    misc: document.createElement('audio')
  }
};

const list: string[] = ['img', 'audio'];

list.forEach(element => {
  Object.keys(json[element]).forEach(name => {
    res[element][name].src = json[element][name];
  });
})

export default res;
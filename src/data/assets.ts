import json from '../../assets/resource.json';

// interface resOption {
//   img: {
//     bonus: HTMLImageElement,
//     boom: HTMLImageElement,
//     brick: HTMLImageElement,
//     misc: HTMLImageElement,
//     npc: HTMLImageElement,
//     player: HTMLImageElement,
//     ui: HTMLImageElement
//   },
//   audio: {
//     count: HTMLVideoElement,
//     attack: HTMLVideoElement,
//     attackOver: HTMLVideoElement,
//     eat: HTMLVideoElement,
//     explode: HTMLVideoElement,
//     pause: HTMLVideoElement,
//     start: HTMLVideoElement,
//     bomb: HTMLVideoElement,
//     life: HTMLVideoElement,
//     misc: HTMLVideoElement
//   }
// }

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
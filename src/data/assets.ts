import json from '../../assets/resource.json';

interface Res {
  img: any,
  audio: any
}

const res: Res = { img: {}, audio: {} };
const list: string[] = ['img', 'audio'];

list.forEach(ele => {
  Object.keys(json[ele]).forEach(key => {
    let element = res[ele];

    element[key] = document.createElement(ele);
    element[key].src = json[ele][key];
  });
});

export default res;
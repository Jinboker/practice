import json from '../../assets/resource.json';

let list: string[] = ['img', 'aud'];
let res: any;

list.forEach(element => {
  Object.keys(json[element]).forEach(obj => {
    res[element][obj] = document.createElement(element);
    res[element][obj].src = json[element][obj];
  });
});

export default res;
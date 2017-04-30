import json from '../../assets/resource.json';

let list: string[] = ['img', 'audio'];
let res: any;

list.forEach(element => {
  Object.keys(json[element]).forEach(name => {
    res[element][name] = document.createElement(element);
    res[element][name].src = json[element][name];
  });
})

export default res;
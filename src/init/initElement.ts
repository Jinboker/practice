const createElement = (element: string) => document.createElement(element);

let cxtRole: CanvasRenderingContext2D;
let cxtBg: CanvasRenderingContext2D;
let cxtMisc: CanvasRenderingContext2D;

export default function () {
  const wrap = createElement('div');

  [cxtRole, cxtBg, cxtMisc] = new Array(3).fill(null)
    .map((ele, index) => {
      const element = (createElement('canvas') as HTMLCanvasElement);

      if (!index) {
        element.style.zIndex = '-1';
      }

      element.width = 516;
      element.height = 456;
      wrap.appendChild(element);

      return element.getContext('2d') as CanvasRenderingContext2D;
    });

  cxtBg.font = '15px prstart';
  cxtBg.fillStyle = '#000';
  cxtBg.textBaseline = 'top';
  cxtMisc.font = '20px prstart';
  cxtMisc.fillStyle = '#000';
  cxtMisc.textBaseline = 'top';

  const body = document.body;

  body.insertBefore(wrap, body.firstChild);
}

export { cxtRole, cxtBg, cxtMisc };

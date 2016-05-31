
window.onload = function () {
	lastTime = Date.now();
	deltaTime = 0;

	init();
	gameLoop();
}


// 画布
let canTop;
let canBottom;
let cxtTop;
let cxtBottom;
let canWidth;    //画布宽度
let canHeight;   //画布高度

let gameUI          //gameUI对象
let tankObj     //坦克对象


/**
 * 初始化
 */
function init() {
	canTop = document.getElementById('canvas-top');
	canBottom = document.getElementById('canvas-bottom');
	cxtTop = canTop.getContext('2d');
	cxtBottom = canBottom.getContext('2d');

	canWidth = canTop.width;
	canHeight = canBottom.height;

	// 键盘按下事件函数
	keyEvent();

	// 坦克对象初始化
	tankObj = new TankObj();
	tankObj.init();     //坦克对象的初始化必须在gameUI的初始化之前，因为gameUI需要这里初始化的图片资源

	// gameUI初始化
	gameUI = new UI();
	gameUI.init();
}

// 确定每帧之间的间隔时间
let lastTime;    //上一帧的时间
let deltaTime;   //两帧的时间差

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	requestAnimFrame(gameLoop);

	// 记录下每帧之间的间隔时间，依靠这个时间确保坦克运动的平滑
	let now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	// 绘制gameUI
	gameUI.draw();

	if(gameUI.status === 2){      //只有在gameUI.status为2的时候才回去绘制游戏界面
		tankObj.draw();      // 绘制坦克
	}
}

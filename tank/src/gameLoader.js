
window.onload = function () {
	lastTime = Date.now();
	deltaTime = 0;

	init();
	gameLoop();
}


// 画布
let cxtTop;
let cxtBottom;
let canWidth;    //画布宽度
let canHeight;   //画布高度

let oUi          //UI对象
let oTankObj     //坦克对象


/**
 * 初始化
 */
function init() {
	let canTop = document.getElementById('canvas-top'),
		canBottom = document.getElementById('canvas-bottom');

	cxtTop = canTop.getContext('2d');
	cxtBottom = canBottom.getContext('2d');

	canWidth = canTop.width;
	canHeight = canBottom.height;

	// 键盘按下事件函数
	keyEvent();

	// 坦克对象初始化
	oTankObj = new TankObj();
	oTankObj.init();     //坦克对象的初始化必须在UI的初始化之前，因为UI需要这里初始化的图片资源

	// ui初始化
	oUi = new UI();
	oUi.init();
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

	// 绘制UI
	oUi.draw();

	if(ui.status === 2){      //只有在ui.status为2的时候才回去绘制游戏界面
		oTankObj.draw();      // 绘制坦克
	}
}

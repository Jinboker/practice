// 游戏入口
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
let topH;
let topW;
let bottomH;
let bottomW;

let gameUI          //gameUI对象
let myTank     //坦克对象
/**
 * 初始化
 */
function init() {
	canTop = document.getElementById('canvas-top');
	canBottom = document.getElementById('canvas-bottom');
	cxtTop = canTop.getContext('2d');
	cxtBottom = canBottom.getContext('2d');

	//画布宽高
	topH = canTop.height;
	topW = canTop.width;
	bottomH = canBottom.height;
	bottomW = canBottom.width;

	// 键盘按下事件函数
	keyInit();

	// 玩家坦克对象初始化
	myTank = new MyTank();
	myTank.init();        //坦克对象的初始化必须在gameUI的初始化之前，因为gameUI需要这里初始化的图片资源

	// gameUI初始化
	gameUI = new UI();
	gameUI.init();
}


let draw = {
	ui : true,
	tank : false,
	map : false
}

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	// 绘制游戏的UI界面
	draw.ui && gameUI.draw();

	if (draw.map) {
		// a();
	}

	//绘制坦克
	draw.tank && myTank.draw();

	// 循环执行函数
	requestAnimFrame(gameLoop);
}

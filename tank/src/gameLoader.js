// 画布相关
let canTop,
 	canBottom,
 	cxtTop,
 	cxtBottom,
 	topH,
 	topW,
 	bottomH,
 	bottomW;

// 所有的类
let oClass = {
	ui : new UI(),
	myTank : new MyTank()
};

//所有的图片
let oImg = {
	ui : document.getElementById('UI'),
	myTank : document.getElementById('myTank'),
	enemyTank : document.getElementById('enemyTank'),
	bonus : document.getElementById('bonus'),
	misc : document.getElementById('Misc')
};
//所有的音频
let oAud = {
	start : document.getElementById('start'),
	over : document.getElementById('over'),
	move : document.getElementById('move'),
	eMove : document.getElementById('eMove'),
	att : document.getElementById('attack'),
	attOver : document.getElementById('attackOver'),
	eat : document.getElementById('eat'),
	boom : document.getElementById('boom'),
	bonus : document.getElementById('bonus')
}

// 控制是否更新某些模块
let draw = {
	ui : true,
	tank : false,
	map : false
};

// 游戏入口
window.onload = function () {
	init();
	gameLoop();
}

/**
 * 初始化
 */
function init() {
	//画布相关
	let oDoc = document;
	canTop = oDoc.getElementById('canvas-top');
	canBottom = oDoc.getElementById('canvas-bottom');
	cxtTop = canTop.getContext('2d');
	cxtBottom = canBottom.getContext('2d');
	topH = canTop.height;
	topW = canTop.width;
	bottomH = canBottom.height;
	bottomW = canBottom.width;

	// 键盘按下事件函数
	keyInit();

	// 玩家坦克对象初始化
	oClass.myTank.init();

	// UI初始化
	oClass.ui.init();
}

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	// 绘制游戏的UI界面
	draw.ui && oClass.ui.draw();

	if (draw.map) {
		// oAud.eMove.play();
	}

	//绘制坦克
	if (draw.tank) {
		cxtTop.clearRect(0 , 0 , topW , topW);
		oClass.myTank.draw();
	}


	// 循环执行函数
	requestAnimFrame(gameLoop);
}

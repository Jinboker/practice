// 画布相关
let canRol = document.getElementById('canvas-role'),
	canBg = document.getElementById('canvas-bg');
let cxt = {
	role : canRol.getContext('2d'),
	bg : canBg.getContext('2d'),
	l : 416,              //l表示canRol的长与宽
	w : 516,              //canBg的宽度
	h : 456               //canBg的高度
}

// 所有的类
let oClass = {
	ui : new UI(),
	myTank : new MyTank(),
	map : new Map()
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
	// 键盘按下事件函数
	keyInit();

	// UI初始化
	oClass.ui.init();

	// 玩家坦克对象初始化
	oClass.myTank.init();

	//游戏地图初始化
	oClass.map.init();
}

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	// 绘制游戏的UI界面
	draw.ui && oClass.ui.draw();

	//绘制地图（地图只有当UI界面的关卡选择界面准备结束的时候才会绘制一次）
	if (draw.map) {
		oClass.map.draw(stage.num);
		draw.map = false;
		stage.num ++;
	}

	//绘制坦克
	if (draw.tank) {
		cxt.role.clearRect(0 , 0 , cxt.l , cxt.l);
		oClass.myTank.draw();
	}

	// 循环执行函数
	requestAnimFrame(gameLoop);
}

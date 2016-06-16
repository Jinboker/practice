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
}

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	// 绘制游戏的UI界面
	draw.ui && oClass.ui.draw();

	// 绘制自定义地图界面
	draw.setMap && oClass.mapEditor.draw();

	//绘制地图（地图只有当UI界面的关卡选择界面准备结束的时候才会绘制一次）
	if (draw.map) {
		draw.map = false;
		oClass.drawMap.draw(stage.num - 1);
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

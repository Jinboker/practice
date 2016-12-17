/**
 * 初始化
 */
function init() {
	oClass = {
		ui: new UI(),
		mapEditor: new MapEditor(),
		drawMap: new DrawMap()
	};

	// 规定所用的字体及颜色
	cxt.bg.font      = "15px prstart";
	cxt.bg.fillStyle = '#000';
	cxt.misc.font    = "15px prstart";

	// 键盘按下事件函数
	keyEvent();

	// UI初始化
	oClass.ui.init();
}

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	// 绘制游戏的UI界面
	draw.ui && oClass.ui.draw();

	// 绘制自定义地图界面
	draw.setMap && oClass.mapEditor.draw();

	// 绘制地图（地图只有当UI界面的关卡选择界面准备结束的时候才会绘制一次）
	draw.map && oClass.drawMap.draw(stage.num - 1);

	// 当可以绘制游戏之时开始处理坦克，子弹，奖励的相关代码
	if (draw.obj) {
		drawTank();                        
		drawBullet();                     
		bonus();                          
	}

	// 循环执行函数
	requestAnimFrame(gameLoop);
}

// 游戏入口
window.onload = function () {
	init();
	gameLoop();
}

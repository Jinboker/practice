// 游戏入口
window.onload = function () {
	init();
	gameLoop();
}

let aTankArr = new Array;
/**
 * 初始化
 */
function init() {
	// 初始化类
	oClass = {
		ui : new UI(),
		tank : new TankObj(),
		mapEditor : new MapEditor(),
		drawMap : new DrawMap()
	};

	// 键盘按下事件函数
	keyInit();

	// UI初始化
	oClass.ui.init();

	// 坦克对象初始化，第一个是玩家坦克，后面四个是敌军坦克
	aTankArr[0] = new PlayerObj(0);
	for (let i = 1; i < 5; i++) {
		aTankArr[i] = new EnemyObj(i);
	}
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

	//绘制一些杂项比如敌方坦克剩余数量，河流的流动，己方坦克生命数
	if (draw.misc) {
		//绘制敌方坦克剩余数量，这个只用在地图绘制完成后绘制一次就行
		if (draw.enemyNum) {
			draw.enemyNum = false;
			enemyNum();
		}
		//河流
		//己方坦克生命数
		if (draw.info) {
			draw.info = false;
		}
	}

	//绘制坦克
	if (draw.tank) {
		cxt.role.clearRect(0 , 0 , cxt.l , cxt.l);
		// 绘制玩家
		aTankArr[0].draw();
		// 绘制敌军
		for (let i = 1; i < 5; i++) {
			aTankArr[i].draw();
		}
	}

	// 游戏暂停
	draw.stop && gameStop();

	// 被子弹打到老家游戏结束
	draw.gameover && gameOver();

	// 循环执行函数
	requestAnimFrame(gameLoop);
}

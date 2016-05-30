
window.onload = function () {
	lastTime = Date.now();
	deltaTime = 0;

	init();
	gameLoop();
}

let aTankObj;

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

	keyEvent();

	aTankObj = new TankObj();
	aTankObj.init();

	aUi = new UI();
	aUi.init();
}


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
	aUi.draw();

	if(ui.status === 2){      //只有在ui.status为2的时候才回去绘制游戏界面
		aTankObj.draw();      // 绘制坦克
	}

}

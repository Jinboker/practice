/**
 * 初始化
 */
function init() {
	let canTop = document.getElementById('canvas-top'),
		canBottom = document.getElementById('canvas-bottom');

	cxtTop = canTop.getContext('2d');
	cxtBottom = canBottom.getContext('2d');
	canWidth = cxtTop.width;
	canHeight = cxtBottom.height;
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

	// switch (expression) {
	// 	case expression:
	//
	// 		break;
	// 	default:
	//
	// }
}

/**
 * 键盘按键事件函数
 */
function keyEvent() {
	addEventListener('keydown' , function (ev) {
		roleCtrl[ev.keyCode] = true;
		console.log(roleCtrl[ev.keyCode]);
	} , false);

	addEventListener('keyup' , function (ev) {
		roleCtrl[ev.keyCode] = false;
		console.log(roleCtrl[ev.keyCode]);
	} , false);
}


window.onload = function () {
	lastTime = Date.now();
	deltaTime = 0;

	init();
	keyEvent();
	gameLoop();
}

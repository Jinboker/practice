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

	aTank.src = 'src/object/image/mayTank.png';
}


var aTank = new Image();


var dir = 0;

/*
 *循环函数，用来逐帧更新画布
 */
function gameLoop() {
	requestAnimFrame(gameLoop);

	// 记录下每帧之间的间隔时间，依靠这个时间确保坦克运动的平滑
	let now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	stage.mode = 1;

	if (stage.mode === 1) {
		switch (true) {
			case roleCtrl[keyVal.up1] === true:
				dir = 0;
				break;

			case roleCtrl[keyVal.down1] === true:
				dir = 128;
				break;

			case roleCtrl[keyVal.left1] === true:
				dir = 192;
				break;

			case roleCtrl[keyVal.right1] === true:
				dir = 64;
				break;

			case roleCtrl[keyVal.fire1] === true:
				console.log('fire');
				break;

			default:
				break;
		}
	}


	cxtTop.drawImage(aTank , 0 , dir , 32 , 32 , 0 , 0 , 32 , 32 );
}

/**
 * 键盘按键事件函数
 */
function keyEvent() {
	addEventListener('keydown' , function (ev) {
		roleCtrl[ev.keyCode] = true;
	} , false);

	addEventListener('keyup' , function (ev) {
		roleCtrl[ev.keyCode] = false;
	} , false);
}


window.onload = function () {
	lastTime = Date.now();
	deltaTime = 0;

	init();
	keyEvent();
	gameLoop();
}

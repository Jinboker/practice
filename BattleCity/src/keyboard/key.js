function keyInit() {
	// 给所有需要用到的按键添加表示是否被按下的属性
	let aKey = [72, 74, 87, 83, 65, 68, 38, 40, 37, 39, 17],
		len = aKey.length;

	for (let i = 0; i < len; i++) {
		keyInfo[aKey[i]] = {
			pressed: false
		}
	}
	// 添加角色1和角色2的上右下左属性
	keyInfo[87].dir = keyInfo[38].dir = 0;
	keyInfo[68].dir = keyInfo[39].dir = 1;
	keyInfo[83].dir = keyInfo[40].dir = 2;
	keyInfo[65].dir = keyInfo[37].dir = 3;
}

function keyDown(keyCode) {
	// 当按键一直被按住的时候不会一直执行
	if (!keyInfo[keyCode].pressed) {
		if (keyCode === 87 || keyCode === 83 || keyCode === 65 || keyCode === 68) {
			keyDir_1 = keyCode;
		}
		// 如果在游戏中按下H键那么就是暂停或者开始
		if ((keyCode === 72) && ui.bInGame && oKeyUp.h) {
			oKeyUp.h = false;
			if (!draw.ui) {
				ui.status = 3;
				draw.ui = true;
				draw.obj = false;
				draw.bullet = false;
			} else {
				cxt.misc.clearRect(170, 220, 150, 20);
				draw.ui = false;
				draw.obj = true;
				draw.bullet = true;
			}
			oAud.pause.play();
		}
		keyInfo[keyCode].pressed = true;
	}
	keyPressed = true;
}

function keyUp(keyCode) {
	// 如果H键跟J键松开，那么将oKeyUp中对应的属性置为真
	(keyCode === 72) && (oKeyUp.h = true);
	(keyCode === 74) && (oKeyUp.j = true);
	keyInfo[keyCode].pressed = false;
}

// function PCEv(...aEvent) {
// 	for (let i = 0; i < 2; i++) {
// 		addEventListener(, function (ev) {
// 			keyCode = ev.keyCode;
// 			// 如果不是对象则表明不是所需要的按键被按下，而所需要的值已经在setKeyInfo函数中设置了
// 			(typeof keyInfo[keyCode] === 'object') && keyDown(keyCode);
// 		}, false);
// 	}
//
// }
//
// function mobileEv() {
//
// 	oVirtualKey.addEventListener(, function (ev) {
// 		keyCode = ev.target.getAttribute('value');
// 		keyDown(keyCode);
// 	}, false);
// }

function eventBind(num, ...sEv) {
	for (let i = 0; i < 2; i++) {
		if (num) {
			addEventListener(sEv[i], function (ev) {
				keyCode = ev.keyCode;
				// 如果不是对象则表明不是所需要的按键被按下，而所需要的值已经在setKeyInfo函数中设置了
				if (typeof keyInfo[keyCode] === 'object') {
					(ev.type === 'keydown') ? keyDown(keyCode) : keyUp(keyCode);
				}
			}, false);
		} else {
			oVirtualKey.addEventListener(sEv[i], function (ev) {
				keyCode = ev.target.getAttribute('value');
				(ev.type === 'touchstart') ? keyDown(keyCode) : keyUp(keyCode);
			}, false);
		}
	}
}

/**
 * 键盘事件函数
 */
function keyEvent() {
	keyInit();

	// PC端事件绑定
	eventBind(1, 'keydown', 'keyup');
	// addEventListener('keydown', function (ev) {
	// 	keyCode = ev.keyCode;
	// 	// 如果不是对象则表明不是所需要的按键被按下，而所需要的值已经在setKeyInfo函数中设置了
	// 	if (typeof keyInfo[keyCode] === 'object') {
	// 		keyDown(keyCode);
	// 	}
	// }, false);
	//
	// addEventListener('keyup', function (ev) {
	// 	keyCode = ev.keyCode;
	// 	if (typeof keyInfo[keyCode] === 'object') {
	// 		keyUp(keyCode);
	// 	}
	// }, false);

	// 移动端事件绑定
	eventBind(0, 'touchstart', 'touchend');
	// oVirtualKey.addEventListener('touchstart', function (ev) {
	// 	// alert(ev.target.getAttribute('value'));
	// 	keyCode = ev.target.getAttribute('value');
	// 	keyDown(keyCode);
	// }, false);
	//
	// addEventListener('touchend ', function (ev) {
	// 	keyCode = ev.target.getAttribute('value');
	// 	keyUp(keyCode);
	// }, false);
}

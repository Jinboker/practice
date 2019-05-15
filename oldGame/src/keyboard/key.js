/**
 * 需要用到的按键的相关参数的初始化
 */
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

/**
 * 按键被按下后应该执行的操作
 * @param  {[number]} iKeyVal [被按下的按键的键值或者value]
 */
function keyDown(iKeyVal) {
	// 当按键一直被按住的时候不会一直执行
	if (!keyInfo[iKeyVal].pressed) {
		if (iKeyVal === 87 || iKeyVal === 83 || iKeyVal === 65 || iKeyVal === 68) {
			keyDir_1 = iKeyVal;
		}
		// 如果在游戏中按下H键那么就是暂停或者开始
		if ((iKeyVal === 72) && ui.bInGame && oKeyUp.h) {
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
			bPC && oAud.pause.play();
		}
		keyInfo[iKeyVal].pressed = true;
	}
	keyPressed = true;
}

/**
 * 按键松开后应该执行的操作
 * @param  {[number]} iKeyVal [松开的按键的键值或者value]
 */
function keyUp(iKeyVal) {
	// 如果H键跟J键松开，那么将oKeyUp中对应的属性置为真
	(iKeyVal === 72) && (oKeyUp.h = true);
	(iKeyVal === 74) && (oKeyUp.j = true);
	keyInfo[iKeyVal].pressed = false;
}

/**
 * 按键事件绑定函数
 * @param  {[number]} num [1表示PC端的事件，0表移动端]
 * @param  {[array]}  aEv [需要绑定的事件名称的数组]
 */
function eventBind(num, ...aEv) {
	for (let i = 0; i < 2; i++) {
		// PC端
		if (num) {
			addEventListener(aEv[i], function (ev) {
				keyCode = ev.keyCode;
				// 如果不是对象则表明不是所需要的按键被按下，而所需要的值已经在setKeyInfo函数中设置了
				if (typeof keyInfo[keyCode] === 'object') {
					(ev.type === 'keydown') ? keyDown(keyCode) : keyUp(keyCode);
				}
			}, false);
		// 移动端
		} else {
			oVirtualKey.addEventListener(aEv[i], function (ev) {
				// 禁止btn上的click事件
				ev.preventDefault();
				keyCode = +ev.target.getAttribute('value');
				(ev.type === 'touchstart') ? keyDown(keyCode) : keyUp(keyCode);
			}, false);
		}
	}
}

/**
 * 键盘事件函数
 */
function keyEvent() {
	// 按键相关参数初始化
	keyInit();

	// PC端事件绑定
	eventBind(1, 'keydown', 'keyup');

	// 移动端事件绑定
	eventBind(0, 'touchstart', 'touchend');
}

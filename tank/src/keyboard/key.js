//键值表
// var keyNum = {
// 	start : 72,          //开始，暂停 H
// 	fire1 : 74,           //发射子弹  J
//
// 	// 角色1的控制
// 	up1 : 87,             //上
// 	down1 : 83,           //下
// 	left1 : 65,           //左
// 	right1 : 68,          //右
//
// 	// 角色2的控制
// 	up2 : 38,             //上
// 	down2 : 40,           //下
// 	left2 : 37,           //左
// 	right2 : 39,          //右
// 	fire2 : 17            //发射子弹
// };


// 游戏控制
let keyPressed = false,            //是否有按键被按下
	keyInfo = new Array(87),
	keyCode =
	keyDir_1 =
	keyDir_2 = null;

//直接在keyInit函数里面调用，用来设置一些相关的按键信息
function setKeyInfo() {
	// 按顺序分别是H（确定，开始，暂停） J（角色1发射子弹，选择） Ctrl（角色2发射子弹）是否被按下
	keyInfo[72] = keyInfo[74] = keyInfo[17] =
	// 角色1的方向键是否被按下
	keyInfo[87] = keyInfo[83] =
	keyInfo[65] = keyInfo[68] =
	// 角色2的方向键是否被按下
	keyInfo[38] = keyInfo[39] =
	keyInfo[40] = keyInfo[37] = {
		pressed : false
	};

	// 角色1和角色2的上右下左
	keyInfo[87] =
	keyInfo[38] = {
		dir : 0
	};
	keyInfo[68] =
	keyInfo[39] = {
		dir : 1
	};
	keyInfo[83] =
	keyInfo[40] = {
		dir : 2
	};
	keyInfo[65] =
	keyInfo[37] = {
		dir : 3
	};
}

function keyInit() {
	let keyUp;
	setKeyInfo();
	addEventListener('keydown' , function (ev) {
		keyCode = ev.keyCode;
		// 如果不是对象则表明不是所需要的按键被按下，而所需要的值已经在setKeyInfo函数中设置了
		if (typeof keyInfo[keyCode] === 'object') {
			// 当按键一直被按住的时候不会一直执行
			if (!keyInfo[keyCode].pressed) {
				if (keyCode === 87 || keyCode === 83 || keyCode === 65 || keyCode === 68) {
					keyDir_1 = keyCode;
				}
				keyInfo[keyCode].pressed = true;
				keyPressed = true;
			}
		}
	} , false);

	addEventListener('keyup' , function (ev) {
		keyUp = ev.keyCode;
		if (typeof keyInfo[keyUp] === 'object') {
			keyInfo[keyUp].pressed = false;
		}
	} , false);
}

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
	keyInfo = new Array(88),
	keyCode =
	keyDir_1 =
	keyDir_2 = null;

//直接在keyInit函数里面调用，用来设置一些相关的按键信息
function setKeyInfo() {
	// 给所有需要用到的按键添加表示是否被按下的属性
	let aKey = [72 , 74 , 87 , 83 , 65 , 68 , 38 , 40 , 37 , 39 , 17],
		len = aKey.length;

	for (let i = 0; i < len; i++) {
		keyInfo[aKey[i]] = {
			pressed : false
		}
	}

	// 添加角色1和角色2的上右下左属性
	keyInfo[87].dir = keyInfo[38].dir = 0;
	keyInfo[68].dir = keyInfo[39].dir = 1;
	keyInfo[83].dir = keyInfo[40].dir = 2;
	keyInfo[65].dir = keyInfo[37].dir = 3;
}

function keyInit() {
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

	let keyUp;
	addEventListener('keyup' , function (ev) {
		keyUp = ev.keyCode;
		if (typeof keyInfo[keyUp] === 'object') {
			keyInfo[keyUp].pressed = false;
		}
	} , false);
}

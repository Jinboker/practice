//键值表
let keyNum = {
	start : 72,          //开始，暂停
	enter : 13,          //回车

	// 角色1的控制
	up1 : 87,             //上
	down1 : 83,           //下
	left1 : 65,           //左
	right1 : 68,          //右
	fire1 : 74,           //发射子弹

	// 角色2的控制
	up2 : 38,             //上
	down2 : 40,           //下
	left2 : 37,           //左
	right2 : 39,          //右
	fire2 : 17            //发射子弹
};

// 游戏控制
let keyPressed = false,            //是否有按键被按下
	keyVal = null,                 //被按下的按键的键值
	keyStatus = new Array(87);     //按键被按下后对应的数组项会为true，可以很方便的去判断到底是哪个按键被按下


// 如果按键检测是直接使用keyVal === 87这种来进行判断的时候，那么我每次键盘事件触发都需要先检查一遍是否是我需要
// 的按键被按下了，把不是的给排除掉，但是用数组的方式来判断就很直接，真就是按下，假就是没有，简单，方便
function keyInit() {
	addEventListener('keydown' , function (ev) {
		keyVal = ev.keyCode;
		// 当按键按下的时候没必要一直触发事件
		if (!keyStatus[keyVal]) {
			keyStatus[keyVal] = true;         //被按下的按键的状态变为true
			keyPressed = true;                  //确实有按键被按下
		}
	} , false);

	addEventListener('keyup' , function (ev) {
		keyStatus[ev.keyCode] = false;
	} , false);
}

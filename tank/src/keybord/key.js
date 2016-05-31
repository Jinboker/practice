// 按键
let keyVal = {     //键值表
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


let pressedKey;        // 按键

let roleCtrl = new Array(87);           // 按下的按键对应的状态存入该数组

/**
 * 键盘按键事件函数
 */
function keyEvent() {
	addEventListener('keydown' , function (ev) {
		roleCtrl[ev.keyCode] = true;
		pressedKey = true;   //表明有按键被按下
	} , false);

	addEventListener('keyup' , function (ev) {
		roleCtrl[ev.keyCode] = false;
	} , false);
}

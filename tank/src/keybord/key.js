// 按键
const keyVal = {     //键值表
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

let roleCtrl = new Array(87);           // 按下的按键对应的状态存入该数组
let pressedKey;        // 布尔值，表明有按键被按下

let control = new Array(87);

function keyInit() {
	control[keyVal.up1] = control[keyVal.up2] = {
		able : false,
		speed : -2,
		dir : 0
	};
	control[keyVal.right1] = control[keyVal.righ2] = {
		able : false,
		speed : 2,
		dir : 1
	};
	control[keyVal.down1] = control[keyVal.down2] = {
		able : false,
		speed : -2,
		dir : 2
	};
	control[keyVal.left1] = control[keyVal.left2] = {
		able : false,
		speed : -2,
		dir : 3
	};
	control[keyVal.enter] = {
		able : false
	};



	addEventListener('keydown' , function (ev) {
		// 通过检测roleCtrl[keyCode]的值，防止键盘事件的持续触发
		if (!roleCtrl[ev.keyCode]) {
			roleCtrl[ev.keyCode] = pressedKey = true;       //pressedKey为真表明有按键被按下
			console.log(control[ev.keyCode].dir);
		}


	} , false);

	addEventListener('keyup' , function (ev) {
		roleCtrl[ev.keyCode] = false;
	} , false);
}

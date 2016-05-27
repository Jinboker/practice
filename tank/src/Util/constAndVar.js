// 确定每帧之间的间隔时间
let lastTime;    //上一帧的时间
let deltaTime;   //两帧的时间差

// 画布
let cxtTop;
let cxtBottom;
let canWidth;    //画布宽度
let canHeight;   //画布高度

// 按键
let keyVal = {     //键值表
	start : 72,          //开始，暂停

	// 角色1的控制
	up1 : 87,             //上
	dowm1 : 83,           //下
	left1 : 65,           //左
	right1 : 68,          //右
	fire1 : 74,           //发射子弹

	// 角色2的控制
	up2 : 38,             //上
	dowm2 : 40,           //下
	left2 : 37,           //左
	right2 : 39,          //右
	fire2 : 17            //发射子弹
};
let roleCtrl = new Array(87);           // 按下的按键对应的状态存入该数组


// 关卡相关
let stage = {
	mode : null,    //当mode为1时表示单人模式
					//当mode为2时表示双人模式
					//当mode为3时表示自定义地图模式

	num : 1         //关卡总数
}

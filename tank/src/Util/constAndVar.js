// 确定每帧之间的间隔时间
let lastTime;    //上一帧的时间
let deltaTime;   //两帧的时间差

// 画布
let cxtTop;
let cxtBottom;
let canWidth;    //画布宽度
let canHeight;   //画布高度


// 按键
let pressedKey;



// 关卡相关
let stage = {
	mode : null,    //当mode为1时表示单人模式
					//当mode为2时表示双人模式
					//当mode为3时表示自定义地图模式

	num : 1         //关卡总数
}



const box = 32;

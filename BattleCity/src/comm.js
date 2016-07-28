// 画布相关
let canRol = document.getElementById('canvas-role'),
	canBg = document.getElementById('canvas-bg'),
	canMisc = document.getElementById('canvas-misc');
let cxt = {
	role : canRol.getContext('2d'),
	bg : canBg.getContext('2d'),
	misc : canMisc.getContext('2d'),
	l : 416,              //l表示canRol的长与宽
	w : 516,              //canBg的宽度
	h : 456               //canBg的高度
}

// 所有的类
let oClass = {
	ui : null,
	tank : null,
	mapEditor : null,
	drawMap : null
};

//所有的图片
let oImg = {
	ui : document.getElementById('UI'),
	myTank : document.getElementById('myTank'),
	enemyTank : document.getElementById('enemyTank'),
	bonus : document.getElementById('bonus'),
	misc : document.getElementById('Misc'),
	brick : document.getElementById('brick'),
	boom : document.getElementById('boom'),
	score: document.getElementById('getScore')
};
//所有的音频
let oAud = {
	start : document.getElementById('start'),
	over : document.getElementById('over'),
	move : document.getElementById('move'),
	eMove : document.getElementById('eMove'),
	att : document.getElementById('attack'),
	attOver : document.getElementById('attackOver'),
	eat : document.getElementById('eat'),
	boom : document.getElementById('boom'),
	bonus : document.getElementById('bonus')
}

// 控制是否更新某些模块
let draw = {
	ui : true,
	tank : false,
	bullet : false,
	setMap : false,
	map : false,
	stop : false,
	misc : false,
	enemyNum : false,
	info : false,
	gameover : false
};

// 奖励类型
let oBonus = {
	home : false,
	star : false,
	life : false,
	shield : false,
	boom : false,
	stop : false
}

// 用来控制画布所在区域的背景
let gameBox = {
	box : document.getElementById('game-box'),
	border : document.getElementById('game-box-border')
}



/**
 * 动画回调函数
 */
let requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

/**
 * 延迟函数，延迟delayNum个循环后再执行fn函数
 * @param  {[number]}   num      [记录这是第几次循环的属性]
 * @param  {[number]}   delayNum [需要循环的次数]
 * @param  {Function}   fn       [执行完delayNum次循环后执行的函数]
 * @return {[number]}            [返回当前循环的次数方便赋值给相关的属性进行记录]
 */
function delay(num , delayNum , fn){
	if (num) {
		num --;
	} else {
		num = delayNum;
		fn();
	}
	return num;
}


function a() {
	console.log('a');
}
function b() {
	console.log('b');
}

// 提前定义好一些需要引入的图片，省掉画图时剪切的时间
// let m_canArrow = document.createElement('canvas'),
// 	m_can_1 = document.createElement('canvas'),
// 	m_can_2 = document.createElement('canvas'),
// 	m_can_3 = document.createElement('canvas'),
// 	m_can_4 = document.createElement('canvas');
//
// m_canArrow.width = m_canArrow.height = 16;
// m_can_1.width = m_can_1.height =
// m_can_2.width = m_can_2.height =
// m_can_3.width = m_can_3.height =
// m_can_4.width = m_can_4.height = 32;
//
// m_canArrow.getContext('2d').drawImage(oImg.misc , 96 , 0 , 16 , 16 , 0 , 0 , 16 , 16);
// m_can_1.getContext('2d').drawImage(oImg.enemyTank , 0 , 0 , 32 , 32 , 0 , 0 , 32 , 32);
// m_can_2.getContext('2d').drawImage(oImg.enemyTank , 64 , 0 , 32 , 32 , 0 , 0 , 32 , 32);
// m_can_3.getContext('2d').drawImage(oImg.enemyTank , 128 , 0 , 32 , 32 , 0 , 0 , 32 , 32);
// m_can_4.getContext('2d').drawImage(oImg.enemyTank , 192 , 0 , 32 , 32 , 0 , 0 , 32 , 32);

// cxt.bg.save();
// cxt.bg.clearRect(35 , 20 , cxt.l , cxt.l);   //这里必须要清除屏幕，不然prstart字体不会被应用！！！！
// cxt.bg.font = "15px prstart";
// cxt.bg.fillStyle = "#b53120";
// cxt.bg.fillText("HI-SCORE", 100, 50);
// cxt.bg.fillText("1-PLAYER", 50, 130);
// cxt.bg.fillStyle = '#ea9e22';
// cxt.bg.fillText("20000", 300, 50);
// cxt.bg.fillText(oScore.tankNum[0] * 100 + oScore.tankNum[1] * 200 + oScore.tankNum[2] * 300 + oScore.tankNum[3] * 400 +  iEatBouns * 500 , 110, 160);
// cxt.bg.fillStyle = '#fff';
// // cxt.bg.fillText("STAGE  "+ stage.num , 190, 90);
// cxt.bg.fillText("PTS", 120, 210);
// cxt.bg.drawImage(m_canArrow ,  230 , 195 , 16 , 16);
// cxt.bg.drawImage(m_can_1 , 250 , 185 , 32 , 32);
// cxt.bg.fillText("PTS", 120, 250);
// cxt.bg.drawImage(m_canArrow ,  230 , 235 , 16 , 16);
// cxt.bg.drawImage(m_can_2 , 250 , 225 , 32 , 32);
// cxt.bg.fillText("PTS", 120, 290);
// cxt.bg.drawImage(m_canArrow ,  230 , 275 , 16 , 16);
// cxt.bg.drawImage(m_can_3 , 250 , 265 , 32 , 32);
// cxt.bg.fillText("PTS", 120, 330);
// cxt.bg.drawImage(m_canArrow ,  230 , 315 , 16 , 16);
// cxt.bg.drawImage(m_can_4 , 250 , 305 , 32 , 32);
// cxt.bg.fillRect(180, 345, 168, 5);
// cxt.bg.fillText("TOTAL", 90, 380);
// cxt.bg.restore();

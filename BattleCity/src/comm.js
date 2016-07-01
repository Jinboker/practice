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
	myTank : null,
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
	brick : document.getElementById('brick')
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


function a() {
	console.log('a');
}
function b() {
	console.log('b');
}

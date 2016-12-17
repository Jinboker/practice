// 画布相关
const canRol  = document.getElementById('canvas-role');
const canBg   = document.getElementById('canvas-bg');
const canMisc = document.getElementById('canvas-misc');

const cxt = {
    role: canRol.getContext('2d'),
    bg: canBg.getContext('2d'),
    misc: canMisc.getContext('2d'),
    l: 416,                                            // l表示canRol的长与宽
    w: 516,                                            // canBg的宽度
    h: 456                                             // canBg的高度
};
// 用来控制画布所在区域的背景
const gameBox = {
    box: document.getElementById('game-box'),
    border: document.getElementById('game-box-border')
};
// 所有的图片
const oImg = {
    ui: document.getElementById('UI'),
    myTank: document.getElementById('myTank'),
    enemyTank: document.getElementById('enemyTank'),
    bonus: document.getElementById('bonus'),
    misc: document.getElementById('Misc'),
    brick: document.getElementById('brick'),
    boom: document.getElementById('boom'),
    score: document.getElementById('getScore')
};
// 所有的音频
const oAud = {
    start: document.getElementById('start'),
    over: document.getElementById('over'),
    att: document.getElementById('attack'),
    explode: document.getElementById('explode'),
    attOver: document.getElementById('attackOver'),
    eat: document.getElementById('eat'),
    bomb: document.getElementById('bomb'),
    miscSound: document.getElementById('miscSound'),
    life: document.getElementById('life'),
    pause: document.getElementById('pause')
};

// 移动端的虚拟按键
let oVirtualKey = document.getElementById('key');

// 分数
let oScore = {
    y: [210, 250, 290, 330],
    tankNum: [0, 0, 0, 0],
    totalScore: 0,
    totalTank: 0
};

// 部分类
let oClass = {
    ui: null,
    mapEditor: null,
    drawMap: null
};

// 控制是否更新某些模块
let draw = {
    ui: true,
    obj: false,
    bullet: false,
    setMap: false,
    map: false
};

// UI
let ui = {};
let stage = {};

// 奖励类型
let oBonus      = null;        // 用来保存奖励对象的实例
let oHome       = {};          // 用来存储控制老家周围障碍改变的相关变量
let iTimerDelay = 0;           // 玩家吃掉定时奖励后NPC经历过iTimerDelay个循环后才能运动

let oBonusType = {
    home: false,
    star: false,
    life: false,
    shield: false,
    boom: false,
    stop: false
};

// 地图相关
// 这里建立一个28*28的roadMap数组而不是建立一个26*26的主要因为子弹的问题
// 子弹图片只有8*8，而坦克是32*32，如果还是用26*26的数组去判断，子弹运动到边界路劲数组就不够用了
let roadMap     = new Array(28);
let setMapInit  = true;                         // 初始化地图设置
// 老家周围一圈砖块的位置
const aHomePosi = [
    [11, 5],
    [11, 6],
    [11, 7],
    [12, 5],
    [12, 7]
];
// 砖块的地图数据
const aHomeData = [
    [20, 9, 19, 8, 10],
    [18, 4, 17, 3, 5]
];
// 自定义地图
let bChangeMap = false;                         //看进入地图编辑模式后是否有改变过地图

// 游戏控制
let keyPressed = false;                         // 是否有按键被按下
let keyInfo    = [88];
let keyCode    = null;
let keyDir_1   = 87;
let keyDir_2   = null;

// 按键松开
let iKeyUp;
let oKeyUp = {
    h: true,
    j: true
};

// 子弹相关
let oBrickStatus = {};                           // 砖头状态
let aBullet      = [];                           // 子弹数组

// NPC相关
let oEnemy = {
    maxTankAlive: 4,                        // 敌军坦克同一时间最多只能有四个
    maxNum: 20,                             // 敌军坦克的总数是20个
    num: 1,                                 // 当前画出来的是第几个坦克，因为坦克是从正中间开始刷新，因此从1开始计数
    iBornDelay: 30,                         // 第一个NPC延迟30个循环后出生，以后的坦克延迟150个循环出生
    bMoveAble: true                         // 定时为假则NPC不会运动
};
const oEnemyData = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 4, 4],
    [8, 8, 4, 5, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 2, 0, 1, 0],
    [5, 4, 0, 2, 8, 0, 0, 2, 1, 0, 4, 4, 2, 0, 2, 0, 8, 0, 5, 0],
    [0, 0, 3, 0, 8, 2, 4, 4, 5, 0, 9, 0, 2, 8, 8, 2, 1, 0, 1, 0],
    [0, 5, 3, 0, 4, 2, 4, 8, 5, 0, 9, 0, 2, 8, 8, 2, 1, 8, 1, 0],
    [2, 2, 0, 0, 3, 3, 0, 0, 0, 1, 0, 8, 0, 8, 0, 0, 4, 4, 4, 0],
    [4, 0, 4, 4, 5, 1, 2, 0, 8, 8, 4, 4, 0, 0, 2, 9, 0, 2, 1, 0],
    [0, 8, 2, 1, 0, 8, 2, 8, 0, 0, 3, 8, 0, 8, 0, 8, 0, 9, 2, 1],
    [4, 4, 2, 8, 5, 4, 2, 5, 8, 2, 4, 8, 4, 2, 4, 8, 3, 8, 4, 4],
    [8, 8, 2, 8, 0, 8, 2, 8, 9, 8, 2, 9, 8, 3, 8, 8, 0, 8, 8, 2],
];

// 爆炸相关
let aBigExplode   = [];                               // 存储大爆炸的数组
let aSmallExplode = [];                               // 存储小爆炸的数组
let aBoom         = [aBigExplode, aSmallExplode];     // 爆炸数组

// 玩家相关
let iEatBouns   = 0;                                  // 玩家吃掉的奖励数
let iPlayerLife = 2;                                  // 玩家的生命数
let iPlayerRank = 0;                                  // 玩家的等级

// 绘制坦克相关
const iEnemyNum = 5;                                  // 同时存在的最大坦克数（包括玩家及NPC）
let aTankArr    = [];
let bGameOver   = false;                              // 游戏结束
let oPlayer;                                          // 用来表示玩家

// 进入计分界面的相关条件参数
let bHasTankDie = true;                               // 是否有坦克不是处于活着的状态
let	bAllTankDie = false;                              // 所有的坦克是否都被干掉
let iDelayEnterScore = 180;                           // 消灭所有的坦克后延迟180个循环后进入分数统计界面

// 判断是否为PC端
let bPC;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    bPC = false;
} else {
    bPC = true;
}
/**
 * 动画回调函数
 */
const requestAnimFrame = (function() {
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
function delay(num, delayNum, fn) {
    if (num) {
        num--;
    } else {
        num = delayNum;
        fn();
    }
    return num;
}

/**
 * 等待180个循环进入统计分数的界面，同时重置所有的数据
 */
function enterScore() {
	iDelayEnterScore = delay(iDelayEnterScore, 180, () => {
        draw.obj = false;
		draw.ui = true;
		bAllTankDie = false;
		oBrickStatus = new Object();                         // 重置砖块状态
		iPlayerLife = oPlayer.iLife;                         // 更新玩家生命
		iPlayerRank = oPlayer.iRank;                         // 更新玩家等级
		aTankArr = [];                                       // 清空坦克数组
		aBullet = [];                                        // 清空子弹数组
		oBonus = null;                                       // 清空奖励对象
		iTimerDelay = 0;                                     // 重置定时器时间
		oHome.bChange = false;                               // 老家障碍不再绘制
		ui.bInGame = false;                                  // 不在游戏中
		ui.status = 2;                                       // 进入计分页面
		oClass.ui.gameScoreInit();                           // 初始化计分页面的相关变量
		cxt.misc.clearRect(0, 0, cxt.w, cxt.h);
		cxt.bg.clearRect(0, 0, cxt.w, cxt.h);
		cxt.role.clearRect(0, 0, cxt.l, cxt.l);
		cxt.bg.drawImage(oImg.score, 0, 0, 516, 456);
		oScore.totalScore = oScore.tankNum[0] * 100 + oScore.tankNum[1] * 200 + oScore.tankNum[2] * 300 + oScore.tankNum[3] * 400 +  iEatBouns * 500;
		oScore.totalTank = oScore.tankNum[0] + oScore.tankNum[1] + oScore.tankNum[2] + oScore.tankNum[3];
	});
}

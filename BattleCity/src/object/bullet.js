// 提前定义四个子弹的canvas，省掉画图时剪切的时间
let m_canT = document.createElement('canvas'),
	m_canR = document.createElement('canvas'),
	m_canD = document.createElement('canvas'),
	m_canL = document.createElement('canvas');

m_canT.width = m_canT.height =
m_canR.width = m_canR.height =
m_canD.width = m_canD.height =
m_canL.width = m_canL.height = 8;

m_canT.getContext('2d').drawImage(oImg.misc , 0 , 0 , 8 , 8 , 0 , 0 , 8 , 8);
m_canR.getContext('2d').drawImage(oImg.misc , 8 , 0 , 8 , 8 , 0 , 0 , 8 , 8);
m_canD.getContext('2d').drawImage(oImg.misc , 16 , 0 , 8 , 8 , 0 , 0 , 8 , 8);
m_canL.getContext('2d').drawImage(oImg.misc , 24 , 0 , 8 , 8 , 0 , 0 , 8 , 8);

// 子弹对象，继承自顶级对象mover
class BulletObj extends MoverObj {
	constructor() {
		super();

		this.oImg                //子弹图片，已缓存
		this.iType = 0;          //当前运动对象为子弹
		this.iRank = 0;          //子弹的等级，为3时一枚子弹打掉16*16的砖块且能够击穿钢筋
	}

	init(x , y , dir , rank = 0){
		this.iSpeed = rank ? 5 : 4;    //如果坦克的iRank是0，那么子弹一次移动4像素，如果不是0，一次移动5像素
		this.bAlive = true;
		this.x = x;
		this.y = y;
		this.iRank = rank;
		this.iDir = dir;
		// 1、3
		if (dir%2) {
			this.y += 12;
			this.x += 24*(+!(dir-1));
			this.oImg = (dir - 1) ? m_canL : m_canR;
		// 0 , 2
		} else {
			this.x += 12;
			this.y += 24*dir/2;
			this.oImg = (dir/2) ? m_canD : m_canT;
		}
		this.moveSet();
	}

	draw(){
		// console.log(this.y);
		// console.log(this.bMoveAble);
		if (this.oRoad[this.iDir]()) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
			cxt.role.drawImage(this.oImg , this.x , this.y , 8 , 8);
		} else {
			this.bMoveSet = true;
			this.bAlive = false;
		}
	}

	// move(){
	// 	this.bMoveSet && this.moveSet();
	// 	this.x += this.iSpeedX;
	// 	this.y += this.iSpeedY;
	// }
}

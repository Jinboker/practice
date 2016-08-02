let oBonus = null,                                    //用来保存奖励对象的实例
	iTimerDelay = 0;                                  //玩家吃掉定时奖励后NPC经历过iTimerDelay个循环后才能运动

/**
 * 奖励对象
 */
class Bonus {
	constructor() {
		this.x;
		this.y;
		this.iType;
		this.iRow;                                     //随机一个地图数组行的值
		this.iCol;                                     //随机一个地图数组列的值
		this.iStatus = 0;                              //奖励状态，有显示和消失两种状态
		this.iDelay = 10;                              //每10次循环更新一次奖励状态
	}

	/**
	 * @param  {[number]} num [当前关卡数]
	 */
	init(num){
		let data;
		this.iType = parseInt(Math.random()*6);         //随机确定奖励类型
		// this.iType = 1;
		do {
			this.iRow = parseInt(Math.random()*10 + 1);
			this.iCol = parseInt(Math.random()*12);
			this.x = this.iCol * 32;
			this.y = this.iRow * 32;
			data = mapData[num][this.iRow][this.iCol];
		// 如果随机出来的位置不位于空白地块或者砖块上的话，重新确定位置
		} while ((data != 0) && (data != 1) && (data != 2) && (data != 3) && (data != 4));
	}

	draw(){
		this.iDelay = delay(this.iDelay , 10 , () => {
			this.iStatus = + !this.iStatus;
			this.iStatus ? cxt.misc.drawImage(oImg.bonus, 32*this.iType, 0, 32, 32, 35 + this.x, 20 + this.y, 32, 32) : cxt.misc.clearRect(35 + this.x, 20 + this.y, 32, 32);
		})
	}
}

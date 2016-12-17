/**
 * 循环检查执行奖励的相关代码
 */
function bonus () {
	// 如果奖励对象的实例不为空，那么绘制奖励对象
	oBonus && oBonus.draw();

	// 定时器
	iTimerDelay ? iTimerDelay -- : oEnemy.bMoveAble = true;

	// 改变老家周围障碍
	oHome.bChange && homeChange();
}

/**
 * 改变老家周围障碍
 */
function homeChange() {
	// 一定时间过后重新渲染障碍
	oHome.iDelay = delay(oHome.iDelay, oHome.iMax, () => {
		let iData, iRow, iCol, iHomeData = aHomeData[oHome.iType];
		// 清空障碍
		cxt.bg.clearRect(227, 372, 32, 32);
		cxt.bg.clearRect(195, 372, 32, 64);
		cxt.bg.clearRect(259, 372, 32, 64);
		// 重绘障碍
		for (let i = 0; i < 5; i++) {
			iRow = aHomePosi[i][0];
			iCol = aHomePosi[i][1];
			iData = mapData[stage.num-1][iRow][iCol] = iHomeData[i];
			cxt.bg.drawImage(oImg.brick, 32*iData, 0, 32, 32, 35+32*iCol, 20+32*iRow, 32, 32);
			// 在开始和结束时根据当前障碍的值重新确定路径(10的时候是钢筋，1的时候砖块)
			if (oHome.iNum === 10 || oHome.iNum === 1) {
				oClass.drawMap.road(iRow, iCol, iData);
			}
		}
		oHome.bChangeType = true;
	});
	// 根据当前oHome.iNum的值来判断是否老家保护是否完结
	if (oHome.bChangeType) {
		oHome.bChangeType = false;
		// 如果oHome.iNum != 10，那么老家周围的障碍开始闪烁
		(oHome.iNum < 10) && (oHome.iDelay = oHome.iMax = 10);
		// 改变渲染类型，看是渲染钢筋还是砖块
		oHome.iType = +!oHome.iType;
		oHome.iNum --;
		// 当oHome.iNum的值归零后此次渲染结束
		(!oHome.iNum) && (oHome.bChange = false);
	}
}

/**
 * 奖励对象
 */
class Bonus {
	constructor() {
		this.x;
		this.y;
		this.iType;
		this.iRow;                                     // 随机一个地图数组行的值
		this.iCol;                                     // 随机一个地图数组列的值
		this.iStatus = 0;                              // 奖励状态，有显示和消失两种状态
		this.iDelay = 15;                              // 每15次循环更新一次奖励状态
	}

	/**
	 * @param  {[number]} num [当前关卡数]
	 */
	init(num){
		let data;
		this.iType = parseInt(Math.random()*6);         // 随机确定奖励类型

		do {
			this.iRow = parseInt(Math.random()*10 + 1, 10);
			this.iCol = parseInt(Math.random()*12, 10);
			this.x = this.iCol * 32;
			this.y = this.iRow * 32;
			data = mapData[num][this.iRow][this.iCol];
		// 如果随机出来的位置不位于空白地块或者砖块上的话，重新确定位置
		} while ((data !== 0) && (data !== 1) && (data !== 2) && (data !== 3) && (data !== 4));
	}

	// 初始化oHome对象
	oHomeInit(){
		oHome = {
			bChange: true,
			bChangeType: false,
			iType: 0,
			iDelay: 0,
			iMax: 800,
			iNum: 10
		};
	}

	draw(){
		this.iDelay = delay(this.iDelay, 10, () => {
			this.iStatus = +!this.iStatus;
			if (this.iStatus) {
				cxt.misc.drawImage(oImg.bonus, 32*this.iType, 0, 32, 32, 35 + this.x, 20 + this.y, 32, 32);
			} else {
				cxt.misc.clearRect(35 + this.x, 20 + this.y, 32, 32);
			}
		})
	}
}

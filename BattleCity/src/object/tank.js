/**
 * 坦克对象，继承自MoverObj
 */
class TankObj extends MoverObj {
	constructor() {
		super();

		this.iIndex;                       //当前坦克在aTankArr中的索引值
		this.iType = 1;                    //当前移动对象为坦克
		this.bAlive = false;               //坦克一开始都是未出生

		//渲染出生时候的动画
		this.bBorned;                      //坦克角色是否已经出生
		this.iBornAniNum = 0;              //出生的动画循环的次数
		this.iBornPic = 0;                 //当前出生的动画所显示的图片
		this.iBornDelay = 3;               //三个循环的延迟改变一次出生的图片

		// 坦克轮胎改变相关
		this.iWheelPic = 0;
		this.iWheelDelay = 5;

		// 子弹相关
		this.iBulletDelay = 20;            //子弹延迟20个循环
		this.oBullet = new BulletObj();

		this.barrierCollision();
	}

	bornInit(){
		this.bMoveSet = true;
		this.bAlive = true;
		this.bBorned = false;
	}

	born(){
		// 动画播放4次
		if (this.iBornAniNum < 4) {
			this.bornDelay = delay(this.bornDelay , 3 , () => {
				// 一个完整的动画由四张图组成
				if (this.iBornPic < 4) {
					this.iBornPic ++;
				} else {
					this.iBornPic = 0;
					this.iBornAniNum ++;
					cxt.misc.clearRect(this.x , this.y , 32 , 32);
				}
				cxt.misc.drawImage(oImg.bonus , 96 - 32 * this.iBornPic , 64 , 32 , 32 , this.x , this.y , 32 , 32);
			});
		} else {
			cxt.misc.clearRect(this.x , this.y , 32 , 32);
			this.iBornAniNum = 0;
			this.bBorned = true;              //出生的动画执行完毕，开始绘制坦克
		}
	}

	// 对象移动函数
	move(){
		// 改变轮胎
		this.iWheelDelay = delay(this.iWheelDelay , 5 , () => {
			this.iWheelPic = +!this.iWheelPic;
		});
		// 根据当前方向重置相关的坐标参数
		this.bMoveSet && this.moveSet();
		// 只有当对象的位置可以整除16才会开始检查是否可以通行（this.oPass继承自mover对象，位于碰撞函数内）
		!(this.x % 16) && !(this.y % 16) && (this.bHitBarrier = this.oHitBarrier[this.iDir]());
		// 移动坦克的坐标
		this.bHitTank = this.tankCollision();
		if (this.bHitBarrier && this.bHitTank) {
			this.x += this.iSpeedX;
			this.y += this.iSpeedY;
		}
	}

	moveSet(){
		this.bMoveSet = false;
		// 在坦克转换方向后重新定位坦克的位置，使坦克当前移动方向的左边正好能够整除16，这样就正好对齐了砖块的契合处
		this.iDir % 2 ? this.y = Math.round(this.y / 16) * 16 : this.x = Math.round(this.x / 16) * 16;
		this.speedSet();
	}

	//坦克与障碍物之间的碰撞检测
	barrierCollision(){
		let iRow,
			iCol,
			arr = [2];

		this.oHitBarrier = {
			0 : () => {
				[iRow , iCol] = [parseInt((this.y - 1) / 16) , parseInt(this.x / 16)];
				return hit(iRow , iCol , iRow , iCol + 1) && this.y > 0;
			},

			1 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
				return hit(iRow , iCol + 2 , iRow + 1 , iCol + 2) && this.x < 384;
			},

			2 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
				return hit(iRow + 2 , iCol , iRow + 2 , iCol + 1) && this.y < 384;
			},

			3 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt((this.x - 1) / 16)];
				return hit(iRow , iCol , iRow + 1 , iCol) && this.x > 0;
			}
		}

		let iRowVal,
			iColVal;

		function hit(...values) {
			for (let i = 0; i < 2; i++) {
				iRowVal = values[2*i];
				iColVal = values[2*i+1];
				arr[i] = barrierVal(roadMap[iRowVal][iColVal]);
			}
			return arr[0] && arr[1];
		}

		function barrierVal(num) {
			switch (num) {
				case 0: return true; break;
				// 砖块钢筋河流老家无法通过
				case 1:
				case 2:
				case 4:
				case 5: return false; break;
				// 冰路中间有相应的代码（默认就是3了）
				default: return true; break;
			}
		}
	}

	// 坦克与坦克之间的碰撞检测
	tankCollision(){
		// 如果所有的NPC坦克都被干掉了，那么就不用检测坦克与坦克之间的碰撞了
		if (bAllTankDie) { return true; }
		
		let xVal,
			yVal,
			bHitTankTest;

		for (let i = 0; i < 5; i++) {
			if ((this.iIndex === i) && !this.bBorned || !aTankArr[i].bBorned) { continue; }
			xVal = this.x - aTankArr[i].x;
			yVal = this.y - aTankArr[i].y;
			if (this.iDir % 2) {
				bHitTankTest = (this.iDir -1)
				? (xVal < 32 && xVal > 26 && Math.abs(yVal) < 32)
				: (xVal > -32 && xVal < -26 && Math.abs(yVal) < 32);
			} else {
				bHitTankTest = this.iDir
				? (yVal > -32 && yVal < -26 && Math.abs(xVal) < 32)
				: (yVal < 32 && yVal > 26 && Math.abs(xVal) < 32);
			}
			if (bHitTankTest) { return false; }
		}
		return true;
	}

	shot(){
		this.oBullet.draw();
	}
}

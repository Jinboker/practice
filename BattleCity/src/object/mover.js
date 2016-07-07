let oBrickStatus = new Object();

// 顶级对象
class MoverObj {
	constructor() {
		this.x;
		this.y;
		this.bAlive = false;      //对象是否存活
		this.iType;               //用来判断当前对象到底是子弹还是坦克（0表示子弹1表示坦克）
		this.iDir;                //方向0：上，1：右，2：下，3：左
		this.iSpeed;              //速度
		this.iSpeedX;             //横坐标上的速度
		this.iSpeedY;             //纵坐标上的速度
		this.bMoveSet = true;     //对象重置后重新设置一下移动相关的函数（坦克在改变方向后也需要重新设置）
		this.bMoveAble = true;    //是否允许运动
		this.bHitBrick = false;   //当前对象是否碰到砖块

		this.collision();
	}

	//根据方向重置当前速度参数
	speedSet(){
		// 1、3，右、左
		if (this.iDir % 2) {
			this.iSpeedX = (this.iDir - 1) ? -this.iSpeed : this.iSpeed;
			this.iSpeedY = 0;
		// 0、2，上、下
		} else {
			this.iSpeedY = this.iDir ? this.iSpeed : -this.iSpeed;
			this.iSpeedX = 0;
		}
	}

	//碰撞检测（坦克与砖块的），子弹与砖块的继承后重写
	collision(){
		let iRow,
			iCol,
			arr = [2];

		function roadJudge(...values) {
			for (let i = 0; i < 2; i++) {
				arr[i] = judge(values[i]);
			}
			return arr[0] && arr[1];
		}

		function judge(num) {
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

		this.oRoad = {
			0 : () => {
				[iRow , iCol] = [parseInt((this.y - 1) / 16) , parseInt(this.x / 16)];
				return roadJudge(roadMap[iRow][iCol] , roadMap[iRow][iCol + 1]) && this.y > 0;
			},

			1 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
				return roadJudge(roadMap[iRow][iCol + 2] , roadMap[iRow + 1][iCol + 2]) && this.x < 384;
			},

			2 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt(this.x / 16)];
				return roadJudge(roadMap[iRow + 2][iCol] , roadMap[iRow + 2][iCol + 1]) && this.y < 384;
			},

			3 : () => {
				[iRow , iCol] = [parseInt(this.y / 16) , parseInt((this.x - 1) / 16)];
				return roadJudge(roadMap[iRow][iCol] , roadMap[iRow + 1][iCol]) && this.x > 0;
			}
		}
	}
}

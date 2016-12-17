// 顶级对象
class MoverObj {
	constructor() {
		this.x;
		this.y;
		this.bAlive;              // 对象是否存活
		this.iDir;                // 方向0：上，1：右，2：下，3：左
		this.iSpeed;              // 速度
		this.iSpeedX;             // 横坐标上的速度
		this.iSpeedY;             // 纵坐标上的速度
	}

	// 根据方向重置当前速度参数
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
}

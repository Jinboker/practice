// 画地图
class DrawMap{
	constructor(){
		this.iData;      // 当前需要绘制的一个地图格子的数据
	}

	/**
	 * [渲染地图并确定路径数据]
	 * @param  {[number]} num [当前需要绘制的关卡数]
	 */
	draw(num){
		draw.map = false;
		// 初始化地图数据
		for (let i = 0; i < 28; i++) {
			roadMap[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		}
		// 自定义地图后必须清空坦克出现位置的砖块，防止玩家在这些地方定义砖块把路堵住了
		if (!num) {
			mapData[0][0][0] =
			mapData[0][0][6] =
			mapData[0][0][12] =
			mapData[0][12][4] = 0;
		}
		// 绘制地图
		for (let i = 0; i < 13; i++) {
			for(let j = 0; j < 13; j++){
				this.iData = mapData[num][i][j];
				if (this.iData) {
					cxt.bg.drawImage(oImg.brick, 32 * this.iData, 0, 32, 32, 35+32*j, 20+32*i, 32, 32);
					// 根据地图数据确定路径数据
					this.road(i, j, this.iData);
				}
			}
		}
	}

	// roadMap值的意义：
 	// 0 ：无障碍
 	// 1 ：砖块
 	// 2 ：钢筋
 	// 3: 冰路
 	// 4: 河流
 	// 5: 老家
	/**
	 * 确定路径数组
	 * @param  {number} i         行
	 * @param  {number} j         列
	 * @param  {number} iData     地图数据
	 */
	road(i, j, iData){
		switch (iData) {
			// 1、2、3、4、5、17、18都表示砖块
			case 1:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 1;
				break;
			case 2:
				// 这里之所以要设0是为了自定义地图时，给老家周围自定义了32*32的砖块
				// 在吃掉钢锹后老家砖块变薄后重新确定路径
				roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 0;
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 1;
				break;
			case 3:
				roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 0;
				roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 1;
				// 将砖块状态清空，主要是在吃了钢锹奖励后需要重置老家周围一圈砖块的状态
				// 下面的4、5、17、18同此
				oBrickStatus[(2*i)*28+(2*j+1)] = null;
				oBrickStatus[(2*i+1)*28+(2*j+1)] = null;
				break;
			case 4:
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 0;
				roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 1;
				oBrickStatus[(2*i+1)*28+(2*j)] = null;
				oBrickStatus[(2*i+1)*28+(2*j+1)] = null;
				break;
			case 5:
				roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
				roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 1;
				oBrickStatus[(2*i)*28+(2*j)] = null;
				oBrickStatus[(2*i+1)*28+(2*j)] = null;
				break;
			case 17:
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
				roadMap[2*i+1][2*j] = 1;
				oBrickStatus[(2*i+1)*28+(2*j)] = null;
				break;
			case 18:
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j] = 0;
				roadMap[2*i+1][2*j+1] = 1;
				oBrickStatus[(2*i+1)*28+(2*j+1)] = null;
				break;
			// 6、7、8、9、10、19、20都表示钢筋
			case 6:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 2;
				break;
			case 7:
				roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 0;
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 2;
				break;
			case 8:
				roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 0;
				roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 2;
				break;
			case 9:
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = 0;
				roadMap[2*i+1][2*j] = roadMap[2*i+1][2*j+1] = 2;
				break;
			case 10:
				roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
				roadMap[2*i][2*j] = roadMap[2*i+1][2*j] = 2;
				break;
			case 19:
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j+1] = 0;
				roadMap[2*i+1][2*j] = 2;
				break;
			case 20:
				roadMap[2*i][2*j] = roadMap[2*i][2*j+1] = roadMap[2*i+1][2*j] = 0;
				roadMap[2*i+1][2*j+1] = 2;
				break;
			// 13表河流，坦克无法越过，但是子弹可以过去
			case 13:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 4;
				break;

			// 15表老家，全部无法通过，子弹打上去game over
			case 15:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 5;
				break;
			// 12表冰块，坦克在冰块上面移动速度加快，出现次数最少，放最下面了
			case 12:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 3;
				break;
			default:
				break;
		}
	}
}

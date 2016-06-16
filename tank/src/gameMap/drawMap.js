let roadMap = new Array(26);

// 画地图
class DrawMap{
	constructor(){
		for (let i = 0; i < 26; i++) {
			roadMap[i] = new Array(26);
		}
	}

	draw(num){        //传入当前需要绘制的关卡数
		for (let i = 0; i < 13; i++) {
			for(let j = 0; j < 13; j++){
				let idata = mapData[num][i][j];
				if (idata) {
					cxt.bg.drawImage(oImg.brick , 32 * idata , 0 , 32 , 32 , 35+32*j , 20+32*i , 32, 32);
					// 根据地图数据确定路径数据
					this.road(i , j , idata);
				}
			}
		}
	}

	// roadMap值的意义：
 	// undefined ：正常，可以通过
 	// 1 ：砖块
 	// 2 ：钢筋
 	// 3 : 冰块
 	// 4 : 河流
 	// 5 : 老家
	/**
	 * 确定路径数组
	 * @param  {number} i     行
	 * @param  {number} j     列
	 * @param  {number} idata 地图数据中当前位置所保存的数据
	 */
	road(i , j , idata){
		switch (idata) {
			//1、2、3、4、5、17、18都表示砖块
			case 1:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 1;
				break;
			case 2:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] = 1;
				break;
			case 3:
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j+1] = 1;
				break;
			case 4:
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 1;
				break;
			case 5:
				roadMap[2*i][2*j] =
				roadMap[2*i+1][2*j] = 1;
				break;

			//6、7、8、9、10都表示钢筋
			case 6:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 2;
				break;
			case 7:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] = 2;
				break;
			case 8:
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j+1] = 2;
				break;
			case 9:
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 2;
				break;
			case 10:
				roadMap[2*i][2*j] =
				roadMap[2*i+1][2*j] = 2;
				break;

			//13表河流，坦克无法越过，但是子弹可以过去
			case 13:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 4;
				break;

			//15表老家，全部无法通过，子弹打上去game over
			case 15:
				roadMap[2*i][2*j] =
				roadMap[2*i][2*j+1] =
				roadMap[2*i+1][2*j] =
				roadMap[2*i+1][2*j+1] = 5;
				break;

			//17跟18主要是老家左上跟右上的两块小砖
			case 17:
				roadMap[2*i+1][2*j] = 1;
				break;
			case 18:
				roadMap[2*i+1][2*j+1] = 1;
				break;

			//12表冰块，坦克在冰块上面移动速度加快，出现次数最少，放最下面了
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

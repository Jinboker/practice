let roadMap = new Array(26);

// 画地图
class DrawMap{
	constructor(){

	}

	init(){
		for (let i = 0; i < 26; i++) {
			roadMap[i] = new Array(26);
		}
	}

	draw(num){        //传入当前需要绘制的关卡数
		a = num -1;
		for (let i = 0; i < 13; i++) {
			for(let j = 0; j < 13; j++){
				if (mapData[a][i][j]) {
					cxt.bg.drawImage(oImg.brick , 32 * mapData[a][i][j] , 0 , 32 , 32 , 35+32*j , 20+32*i , 32, 32);
					roadMap[2*i][2*j] =
					roadMap[2*i][2*j+1] =
					roadMap[2*i+1][2*j] =
					roadMap[2*i+1][2*j+1] = 1;
				}
			}
		}
	}
}

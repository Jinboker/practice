// 画地图
class Map{
	constructor(){

	}

	init(){
		this.x = null;
	}

	draw(num){        //传入当前需要绘制的关卡数
		a = num -1;
		for (let i = 0; i < 12; i++) {
			for(let j = 0; j < 12; j++){
				console.log(mapData[num-1][i][j]);
				cxt.bg.drawImage(oImg.brick , 32 * mapData[a][i][j] , 0 , 32 , 32 , 35+32*i , 20+32*j , 32, 32);
			}
		}
	}

	road(){

	}
}

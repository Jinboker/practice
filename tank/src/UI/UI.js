// UI
let ui = {
	status : 0           //当为0时表示开始的UI
						 //当为1时表示正在游戏的UI
						 //当为2时表示记分的UI
						 //当为3时表示游戏结束
};
let uiImage;

class UI {
	constructor() {
		this.x;
		this.y;
	}

	init(){
		this.uiImage = new Image();
		this.uiImage.src = 'src/UI/UI.png';

		this.moveToTop = false;
	}

	draw(){
		switch (ui.status) {
			case 0:
				this.gameStart();
				break;
			default:
				break;
		}
	}

	gameStart(){
		if (this.moveToTop === false) {
			if (roleCtrl[keyVal.enter] === true) {
				cxtBottom.clearRect(0 , 0 , canWidth , canHeight);
				cxtBottom.drawImage(this.uiImage , 0 , 0 , 376 , 160 , 20 , 95 , 376 , 160);
				this.moveToTop = true;
			} else {

				cxtBottom.drawImage(this.uiImage , 0 , 0 , 376 , 160 , 20 , 95 , 376 , 160);
			}
		}
	}


}

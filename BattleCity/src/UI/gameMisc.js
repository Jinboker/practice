// 游戏暂停
let stopSet;

function gameStop() {
	if (stopSet) {
		stopSet = false;
		cxt.bg.save();
		cxt.bg.font = "20px prstart";
		cxt.bg.fillStyle = '#b53120';
		cxt.bg.fillText("GAME STOP" , 140 , 220);
		cxt.bg.restore();
	}
	if (keyInfo[72].pressed && oKeyUp.h) {
		oKeyUp.h = false;
		draw.stop = false;
		draw.tank = true;
	}
}


// 游戏结束
function gameOver(){
	draw.gameover = false;
	draw.tank = false;
	cxt.bg.clearRect(227 , 404 , 32 , 32);
	cxt.bg.drawImage(oImg.brick , 512 , 0 , 32 , 32 , 227 , 404 , 32, 32);
}

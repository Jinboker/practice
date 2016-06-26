// 游戏暂停
let stopSet,
	stopAble = false,
	startAble = true;

function gameStop() {
	if (stopSet) {
		stopSet = false;
		cxt.role.save();
		cxt.role.fillStyle = '#b53120';
		cxt.role.fillText("GAME STOP" , 140 , 220);
		cxt.role.restore();
	}
	if (!keyInfo[72].pressed) {
		stopAble = true;
	}

	// 如果按下确认键（H键），则暂停中止
	if (stopAble && keyInfo[72].pressed) {
		draw.stop = false;
		draw.tank = true;
		stopAble = false;
	}
}


// 游戏结束
function gameOver(){
	a();
}

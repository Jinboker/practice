// 敌军剩余数目
function enemyNum() {
	let x = 0;
	let y = 0;
	for (let i = 0; i < oEnemy.maxNum; i++) {
		if (i % 2) {
			x ++;
		} else {
			x --;
			y ++;
		}
		cxt.bg.drawImage(oImg.misc, 0, 16, 16, 16, 481+x*18, 20+y*18, 16, 16);
	}
};

// 己方生命数及关卡数
function myInfo() {
	cxt.bg.clearRect(463, 280, 53, 110);
	cxt.bg.fillText("1P", 463, 295);
	cxt.bg.fillText(oPlayer.iLife, 483, 315);
	cxt.bg.drawImage(oImg.misc, 16, 16, 16, 16, 463, 300, 16, 16);
	cxt.bg.drawImage(oImg.misc, 128, 0, 32, 32, 463, 350, 32, 32);
	cxt.bg.fillText(stage.num, 483, 390);
}

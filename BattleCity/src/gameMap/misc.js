let m_canEN = document.createElement('canvas');
m_canEN.width = m_canEN.height = 18;
m_canEN.getContext('2d').drawImage(oImg.misc , 0 , 16 , 16 , 16 , 2 , 2 , 16 , 16);

// 敌军剩余数目
function enemyNum() {
	let x = 0 , y = 0;
	for (let i = 0; i < oEnemy.maxNum; i++) {
		if (i % 2) {
			x ++;
		} else {
			x --;
			y ++;
		}
		cxt.bg.drawImage(m_canEN , 451 + 30 + x * 18 , 20 + y * 18 , 16 , 16);
	}
};

// 己方生命数及关卡数
function myInfo() {

}

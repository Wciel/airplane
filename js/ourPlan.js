
var ourplan = new ourplan(142, 485, 'image/我的飞机.gif', 66, 80, 0, 30, 0, 'image/本方飞机爆炸.gif');
//我们的飞机
function ourplan(x, y, imgSrc, width, height, speed, hp, score, boomImgSrc) {
	plan.call(this, x, y, imgSrc, width, height, speed, hp, score, boomImgSrc);
	this.imageNode.setAttribute('id', 'ourplan');
}
//飞机移动
function ourPlanMove() {
	//飞机添加事件
	var event = window.event || arguments[0];
	var selfPlanX = event.clientX - 500; // 获取鼠标X位置
	var selfPlanY = event.clientY;//获取鼠标Y位置
	ourplan.imageNode.style.left = selfPlanX - ourplan.width / 2 + 'px';//飞机距离左边位置
	ourplan.imageNode.style.top = selfPlanY - ourplan.height / 2 + 'px';//飞机距离上边位置
}
//判断是否在mainDiV里面
function ourPlanMoveOut() {
	var event = window.event || arguments[0]; //添加事件
	var selfPlanX = event.clientX; // 重新获取鼠标位置进行判断 
	var selfPlanY = event.clientY;
	if (selfPlanX < 505 || selfPlanY < 0 || selfPlanY > 568 || selfPlanX > 815) {

		if (document.removeEventListener) //如果
			mainDiv.removeEventListener('mousemove', ourPlanMove, true); //如果满足条件则移除鼠标移动事件，
		//不让飞机出框
		else if (document.attachEvent)
			mainDiv.removeEventListener('onmousemove', ourPlanMove);
	}
	else {
		if (document.removeEventListener)
			mainDiv.addEventListener('mousemove', ourPlanMove, true);
		else
			mainDiv.attachEvent('onmousemove', ourPlanMove);
	}
}
//我的飞机和掉落的礼物
function isCreashedWithgift(my, other) {
	if (my.imageNode.offsetLeft + my.width > other.imageNode.offsetLeft &&
		my.imageNode.offsetLeft < other.imageNode.offsetLeft + other.width) {
		if (my.imageNode.offsetTop + my.height > other.imageNode.offsetTop
			&& my.imageNode.offsetTop < other.imageNode.offsetTop + other.height)
			return true;
	}
	return false;
}

//是否和敌机相撞
function isCreashed(my, other) {
	if (my.BulletimageNode.offsetLeft + my.width > other.imageNode.offsetLeft &&
		my.BulletimageNode.offsetLeft < other.imageNode.offsetLeft + other.width) {
		if (my.BulletimageNode.offsetTop + my.height > other.imageNode.offsetTop
			&& my.BulletimageNode.offsetTop < other.imageNode.offsetTop + other.height)
			return true;
	}
	return false;
}
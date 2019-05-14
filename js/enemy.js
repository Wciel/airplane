
//创建飞机对象
function plan(x, y, imgSrc, width, height, speed, hp, score, boomImgSrc) {
	this.x = x;
	this.y = y;
	this.imgSrc = imgSrc;
	this.width = width;
	this.height = height;
	this.speed = speed;
	this.hp = hp;
	this.score = score;
	this.boomImgSrc = boomImgSrc;
	this.init = init;
	this.ifdide = false;
	//立刻调用init方法初始化对象。
	this.init();
	this.move1 = EnemyMove;
}
//敌人飞机
function Enemy(a, b, imgSrc, width, height, speed, hp, score, boomImgSrc) {
	plan.call(this, Random(a, b), 20, imgSrc, width, height, speed, hp, score, boomImgSrc);
}
//敌机飞机移动
function EnemyMove() {
	this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 'px';
}
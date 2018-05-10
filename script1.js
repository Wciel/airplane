var box1 = document.getElementById("box1");
var mainDiv = document.getElementById("maindiv");
var score = document.getElementById("score");
var score1 = document.getElementById("score1");
var whenOnclick = document.getElementById("whenOnclick");
var enddiv = document.getElementById("enddiv");
var endscore = document.getElementById("endscore");
var lifea = document.getElementById("lifea");
var retu1 = document.getElementById("retu1");
var moneys = document.getElementById("money");
var chat = document.getElementById("chat");
var zidan = document.getElementById("zidan");
var guanshu = document.getElementById("guanshu");
var addlife = document.getElementById("addlife");
var isqingping = false;
var clear;
var kkk = false;
var scond;
var isshow = true;
var voctory1 = false;
var s = 3;
var score2 = 5000;
var temp = false;
var guanshus = 1;
var ifclear = false;
var Bullets = [];
var Enemys = [];
var gifts = [];
var life = 0;
var x1 = 35, x2 = 22, x3 = 3;
var a1 = 1000, a2 = 300, a3 = 350;
var mark = 0;
var mark1 = 0;
var scores = 0;
var zidans = 0;
var time = 0;
var money = 0;
var isclear = false;
var s1 = 1, s2 = 2, s3 = 3;
var ourplan = new ourplan(142,485,'image/我的飞机.gif',66,80,0,30,0,'image/本方飞机爆炸.gif');
function begin(){
	box1.style.display = 'none';
	mainDiv.style.display = 'block';
	score.style.display = 'block';
	clear = setInterval(start, 20);
}//定时函数
function retur () {
	 retu1.style.display = 'none';
	 whenOnclick.style.display = 'none';
	 location.reload(true);
}
//继续游戏函数
	function GoOn1(){
		addlife.style.display = 'none';
		moneys.innerHTML = money;
		score1.innerHTML = scores;
		enddiv.style.display = 'none';
		whenOnclick.style.display = 'none';
		 clear = setInterval(start, 20);
		 mainDiv.addEventListener('mousemove', ourPlanMove,true);// 鼠标移动事件，鼠标移动函数，以捕获方式进行。
		 mainDiv.addEventListener('mousemove', ourPlanMoveOut,true);
	}
function start(){
	mark++;
	//添加生命
	if (mark % a1 == 0) {
		var ourgif1 = new ourGif1(Random(10,320), 10,'image/加生命.png',1);
		gifts.push(ourgif1);
	}
	//添加金钱
	if (mark % a2 == 0){
		var ourgif1 = new ourGif1(Random(10,320), 11,'image/金钱.png',2);
		gifts.push(ourgif1);
	}
	//增加子弹
	if (mark % a3 == 0){
		var ourgif1 = new ourGif1(Random(10,320), 11,'image/子弹.png',3);
		gifts.push(ourgif1);
	}
	//改变鼓励文字
	if (scores == 10000){
		chat.innerHTML = "哎哟不错哦，看我膜拜的眼神，继续努力!!!";
	}
	if (scores == 100000){
		chat.innerHTML = "我的天，你要超神了，你造吗!!!";
	}
	//实现复活清屏
	if(isqingping == true) 
		clearping1();
	//创建敌机对象
	if (mark % 5 == 0){
		mark1++;
		if (mark1 % x2 == 0){
			//创建中飞机对象
			var enemy = new Enemy(27,270,'image/enemy3_fly_1.png',46,60,Random(s1,s3),5,100,'image/中飞机爆炸.gif');
			Enemys.push(enemy);
		}
		 if (mark1 % x1 == 0) {
		 	//创建大飞机对象
			var enemy = new Enemy(100,220,'image/enemy2_fly_1.png',110,164,s1,10,500,'image/大飞机爆炸.gif');
			Enemys.push(enemy);
			mark1 = 0;
	    }
		if (mark1 % x3 == 0) {
			//创建小飞机对象
			var enemy = new Enemy(30,300,'image/enemy1_fly_1.png',34,24,Random(s2,s3),1,50,'image/小飞机爆炸.gif');
			Enemys.push(enemy);
		}
		//添加子弹
		var bulletX = ourplan.imageNode.offsetLeft + ourplan.width / 2;
        var bulletY = ourplan.imageNode.offsetTop;
	    var bullet = new OurBullet(bulletX, bulletY);
	    var temp = false;
	    Bullets.push(bullet);
	    //改变子弹
	    changebullet();
	    //判断关数
	    addguanshu();
	    //增加难度，每隔三关清一次屏	   
	    changelv();
	}
	//清除礼物
	for (var i = 0; i < gifts.length; i++){
		if (gifts[i] != 'undefined')  gifts[i].move2();
		if (gifts[i].ifget == true && mark % 15 ==0 || gifts[i].BulletimageNode.offsetTop > 586){
			mainDiv.removeChild(gifts[i].BulletimageNode);
	    	gifts.splice(i,1);
		}
	}
	//让子弹移动并清除
	 for (var i = 0; i < Bullets.length; i++){
	    if (Bullets[i] != 'undefined')
	    	Bullets[i].move();
	    if (Bullets[i].BulletimageNode.offsetTop <= 0){
	    	mainDiv.removeChild(Bullets[i].BulletimageNode);
	    	Bullets.splice(i,1);
	    }
    }
    //遍历敌机移动，并清除
    for (var i = 0; i < Enemys.length; i++) {
     	if (Enemys[i] != 'undefined')
	      Enemys[i].move1();
	      if (Enemys[i].imageNode.offsetTop > 568){
	     	mainDiv.removeChild(Enemys[i].imageNode);
	     	Enemys.splice(i,1);
        }
        if(Enemys[i].ifdide == true && mark % 15 ==0){
        	mainDiv.removeChild(Enemys[i].imageNode);
	     	Enemys.splice(i,1);
        }
    }
	//判断礼物是否获得
	for (var i = 0; i < gifts.length;i++) {
		var GiftsI = gifts[i];
		if (GiftsI.ifget == false){
			if(isCreashed(GiftsI,ourplan) == true){
				//temp = false;
				if (GiftsI.key == 1) life++;
				if (GiftsI.key == 2) money++;
				if (GiftsI.key == 3) zidans++;
				lifea.innerHTML = life;
				moneys.innerHTML = money;
				zidan.innerHTML = zidans;
				GiftsI.ifget = true;
				mainDiv.removeChild(GiftsI.BulletimageNode);
			    gifts.splice(i,1);
			}	
		}
	}
    //判断自己飞机是否爆炸
    for (var i = 0; i < Enemys.length; i++) {
    	var EnemyI = Enemys[i];
    	if(EnemyI.ifdide == false)
	    	if(isCreashed1(ourplan,EnemyI) == true){
	    		//if (mark % 5000) voctory1 = false;
	    		if(voctory1 == true) 
	    			continue;
	    	    else {
			    	ourplan.hp = ourplan.hp - 1;
			    	    //如果死亡，则停止画面
			    	if (ourplan.hp == 0){
			    		isshow = false;
			    	    ourplan.imageNode.src = ourplan.boomImgSrc;
			    	    if(document.removeEventListener) {
					        mainDiv.removeEventListener('mousemove',ourPlanMove, true);
					        mainDiv.removeEventListener('mousemove',ourPlanMoveOut, true); 
					    }
					    else if (document.attachEvent)
						    mainDiv.removeEventListener('onmousemove', ourPlanMove);
			    	    clearInterval(clear);
			    	    enddiv.style.display = 'block';
			    	    whenOnclick.style.display = 'none';
			    	    endscore.innerHTML =scores;
			    	    break;
			        } 
		        }
		    }
    }
    //遍历判断是否相撞，爆炸
    for (var i = 0; i < Enemys.length; i++) {
    	var EnemyI = Enemys[i];
    	for (var j = 0; j < Bullets.length;j++) {
    		var BulletJ = Bullets[j];
    		if (EnemyI.ifdide == false)
	    		if (isCreashed(BulletJ,EnemyI) == true){
		    			EnemyI.hp = EnemyI.hp - 1;
		    			if (EnemyI.hp == 0) {
		    				scores += EnemyI.score;
		    				score1.innerHTML = scores;
		    				EnemyI.imageNode.src = EnemyI.boomImgSrc;
		    				EnemyI.ifdide =true;
		    			}
		    		mainDiv.removeChild(BulletJ.BulletimageNode);
			    	Bullets.splice(j,1);
			    	break;
			    }
	    }  	
    }
}
	//创建子弹
	function Bullet(x, y, imgSrc, width, height,key) {
		  this.x = x;
		  this.y = y;
		  this.width = width;
		  this.height = height;
		  this.imgSrc = imgSrc;
		  this.init = Bulletinit;
		  this.init();
		  this.key = key;
		  this.move = BulletMove;
		  this.move2 = GiftsMove;
		  this.ifget = false;
		  this.ifmoney = false;
		  this.temp = false;
	}
	function  Bulletinit() {
		 this.BulletimageNode = document.createElement("img"); 
		 this.BulletimageNode.style.position = 'absolute';
		 this.BulletimageNode.style.left = this.x +'px';
		 this.BulletimageNode.style.top = this.y + 'px';
		 this.BulletimageNode.src = this.imgSrc;
		 mainDiv.appendChild(this.BulletimageNode);
	}
	//礼物移动
	function  GiftsMove() {
		this.BulletimageNode.style.top = this.BulletimageNode.offsetTop + 5 + 'px';
	}
	//敌机飞机移动
	function  EnemyMove() {
		this.imageNode.style.top = this.imageNode.offsetTop + this.speed + 'px';
	}
	//子弹移动
	 function BulletMove() {
	     this.BulletimageNode.style.top = this.BulletimageNode.offsetTop - 10 + 'px'; 
    }
	function OurBullet(x,y) {
		Bullet.call(this,x,y,'image/bullet1.png',6,14);
		this.BulletimageNode.setAttribute('id','OurBullet');  
	}
	//增加子弹物品
	function ourGif1 (x,y,imgSrc,key) {
		Bullet.call(this,x,y,imgSrc,37,36,key);  
	}
	//创建飞机对象
	function plan(x,y,imgSrc,width,height, speed,hp,score,boomImgSrc) {
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
	function init(){
		 this.imageNode = document.createElement("img"); 
		 this.imageNode.style.position = 'absolute';
		 this.imageNode.style.left = this.x +'px';
		 this.imageNode.style.top = this.y + 'px';
		 this.imageNode.src = this.imgSrc;
		 mainDiv.appendChild(this.imageNode);
	}
	//我们的飞机
	function ourplan (x,y,imgSrc,width,height,speed,hp,score,boomImgSrc) {
		plan.call(this,x,y,imgSrc,width,height,speed,hp,score,boomImgSrc);
		this.imageNode.setAttribute('id', 'ourplan');  
	}
	//敌人飞机
	function  Enemy(a,b,imgSrc,width,height,speed,hp,score,boomImgSrc) {
		   plan.call(this,Random(a,b),20,imgSrc,width,height,speed,hp,score,boomImgSrc);
	}
	//产生max到min之间的随机数
	function Random(min,max) {
		 var number  = Math.random();
		 return Math.floor(min + number*(max-min));
	}
	function ourPlanMove () {
		//飞机添加事件
		var event = window.event || arguments[0];
		var selfPlanX = event.clientX-500; // 获取鼠标X位置
		var selfPlanY = event.clientY;//获取鼠标Y位置
		ourplan.imageNode.style.left = selfPlanX - ourplan.width/2+'px';//飞机距离左边位置
		ourplan.imageNode.style.top = selfPlanY - ourplan.height/2+'px';//飞机距离上边位置
	}
	//判断是否在mainDiV里面
	function ourPlanMoveOut () {
		var event = window.event || arguments[0]; //添加事件
		var selfPlanX = event.clientX; // 重新获取鼠标位置进行判断 
		var selfPlanY = event.clientY;
		if (selfPlanX < 505 || selfPlanY < 0 || selfPlanY > 568 || selfPlanX > 815){

			if(document.removeEventListener) //如果
			    mainDiv.removeEventListener('mousemove',ourPlanMove, true); //如果满足条件则移除鼠标移动事件，
			                                                                //不让飞机出框
			else if (document.attachEvent)
				mainDiv.removeEventListener('onmousemove', ourPlanMove);
		}
		else{
		    if (document.removeEventListener)
		    	mainDiv.addEventListener('mousemove', ourPlanMove,true);
		    else
		    	mainDiv.attachEvent('onmousemove',ourPlanMove);
		}
	}
	//点击事件函数
	function  Go1() {
		   clearInterval(clear);
		   mainDiv.removeEventListener('mousemove',ourPlanMove, true);
		   mainDiv.removeEventListener('mousemove',ourPlanMoveOut, true);
		   whenOnclick.style.position = 'absolute';
	       whenOnclick.style.top = ourplan.imageNode.offsetTop + 'px';
	       whenOnclick.style.left = ourplan.imageNode.offsetLeft + 10 +'px';
		   whenOnclick.style.display = 'block';
	} 
	//添加鼠标移动事件和鼠标移除事件和点击事件
	if (document.addEventListener){
		mainDiv.addEventListener('mousemove', ourPlanMove,true);// 鼠标移动事件，鼠标移动函数，以捕获方式进行。
		mainDiv.addEventListener('mousemove', ourPlanMoveOut,true);
		//当能有效点击时才可以点击
		if (isshow == true)
			mainDiv.addEventListener('click',Go1,true);
	}
	//进行兼容判断
	else if(document.attachEvent){
		mainDiv.attachEvent('onmousemove',ourPlanMove);
		mainDiv.attachEvent('onmousemove',ourPlanMoveOut);
	}
	//敌机和我的飞机
	function isCreashed (my,other) {
		   if (my.BulletimageNode.offsetLeft + my.width > other.imageNode.offsetLeft && 
		   	my.BulletimageNode.offsetLeft < other.imageNode.offsetLeft + other.width){
		   	   if(my.BulletimageNode.offsetTop + my.height > other.imageNode.offsetTop 
	    	   &&  my.BulletimageNode.offsetTop < other.imageNode.offsetTop + other.height)
		   	   return true;
		   }
		return false;
	}
	//我的飞机和掉落的礼物
	function isCreashed1 (my,other) {
		   if (my.imageNode.offsetLeft + my.width > other.imageNode.offsetLeft && 
		   	my.imageNode.offsetLeft < other.imageNode.offsetLeft + other.width){
		   	   if(my.imageNode.offsetTop + my.height > other.imageNode.offsetTop 
	    	   &&  my.imageNode.offsetTop < other.imageNode.offsetTop + other.height)
		   	   return true;
		    }
		return false;
	}
	//游戏达到一定分数后清屏函数
	function clearping1() {
		for (var i = 0; i < Enemys.length; i++) {
			    Enemys[i].imageNode.src = Enemys[i].boomImgSrc;
			mainDiv.removeChild(Enemys[i].imageNode);
			Enemys.splice(i,1);
		}
	}
	function isGetlife() {
		whenOnclick.style.display = 'none';
		ifclear == false;
		 if (life != 0){
		 	ourplan.hp = 50;
		 	//mainDiv.removeChild(ourplan.imageNode);
		 	//添加清屏标记
		 	isqingping = true;
		 	//当有生命值时，才能点击DIV框有效
		 	isshow = true;
		 	//voctory ();
		 	ourplan.imageNode.src = 'image/我的飞机.gif';
		 	GoOn1();
		 	life--;
		 	lifea.innerHTML = life;
		 }
		 else {
		 	enddiv.style.display = 'none';
		 	retu1.style.display = 'block';
		 }
	}
	//增加子弹数量函数
	function changebullet (){
		if (zidans > 0){
			var bulletX = ourplan.imageNode.offsetLeft + ourplan.width / 2;
            var bulletY = ourplan.imageNode.offsetTop;
			var bullet = new OurBullet(bulletX-ourplan.width / 2, bulletY);
 	        Bullets.push(bullet);
	        var bullet = new OurBullet(bulletX+ourplan.width / 2, bulletY);
	        Bullets.push(bullet);
		}
		if (zidans > 0 && mark % 250 == 0) zidans--;
		//如果一千毫秒过后，关闭无敌模式
		//再次获取秒数判断是否到了10秒
		var myDate = new Date();
		var  seconds1 = myDate.getSeconds();
		if (seconds1 >= scond + 8 && kkk == true) {
			voctory1 = false;
			isqingping = true;
			kkk = false;
		}
		if (seconds1 >= scond + 10) isqingping = false;
		//关闭清屏函数
		if(mark % 150 == 0) isqingping = false;
	}
	//判断关数
	function addguanshu () {
	    if (scores >= score2 && temp == false) {
	    	score2 += 5000;
		    guanshus++;
		    guanshu.innerHTML = guanshus;
		    temp = true;
	    } 
	    if (mark % 300 == 0) temp = false;
	}
	//改变难度
	function changelv (argument) {
		 if (guanshus >= s && x1 && x2 && x2) {
		 	s += 5;
		 	a1 += 100;
		 	x1 -= 1;
		 	x2 -= 1;
		 	x3 -= 1;
		 	s1 += 1;
            s2 += 1;
            s3 += 1;
            clearping1(); //间隔五关清一次屏
		 }
		 if (x1 <= 0 || x2 <= 0 || x3 <= 0){
		 	alert("能活到现在，我反正是服了");
		 }
	}
	//增加生命
	function addlife1 () {
		 if (money >= 50)  {
		 	life++;
		 	money -= 50;
		 	lifea.innerHTML = life;
		 }
		 else{
		 	whenOnclick.style.display = 'none';
		 	addlife.style.display = 'block';
		}
	}
	//无敌模式函数
	function voctory () {
		enddiv.style.display = 'none';
		whenOnclick.style.display = 'none';
		voctory1 = true;
		var myDate = new Date();
		var  seconds = myDate.getSeconds(); //获取当前秒数(0-59)
		scond = seconds;
		kkk = true;
	    GoOn1();
	}
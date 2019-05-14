
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
var scond;
var clear = null;
var Bullets = [];
var Enemys = [];
var gifts = [];
var s1 = 1, s2 = 2, s3 = 3;
var x1 = 35, x2 = 22, x3 = 3;
var a1 = 1000, a2 = 300, a3 = 350;
var s = 3, score2 = 5000, guanshus = 1, life = 0;
var mark = 0, mark1 = 0, scores = 0, zidans = 0, time = 0, money = 0;
var isclear = false, sqingping = false, kkk = false, isshow = true,voctory1 = false,temp = false, ifclear = false,  isqingping = false;
function init() {
	this.imageNode = document.createElement("img");
	this.imageNode.style.position = 'absolute';
	this.imageNode.style.left = this.x + 'px';
	this.imageNode.style.top = this.y + 'px';
	this.imageNode.src = this.imgSrc;
	mainDiv.appendChild(this.imageNode);
}
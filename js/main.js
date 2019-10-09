var box1 = document.getElementById("box1");


// add 注释
function addEventListener() {

    //添加鼠标移动事件和鼠标移除事件和点击事件
    if (document.addEventListener) {
        mainDiv.addEventListener('mousemove', ourPlanMove, true);// 鼠标移动事件，鼠标移动函数，以捕获方式进行。
        mainDiv.addEventListener('mousemove', ourPlanMoveOut, true);
        //当能有效点击时才可以点击
        if (isshow == true)
            mainDiv.addEventListener('click', beginGamePageInit, true);
    }
    //进行兼容判断
    else if (document.attachEvent) {
        mainDiv.attachEvent('onmousemove', ourPlanMove);
        mainDiv.attachEvent('onmousemove', ourPlanMoveOut);
    }
}

// 初始化开始游戏界面
function beginGamePageInit() {
	clearInterval(clear);
	mainDiv.removeEventListener('mousemove', ourPlanMove, true);
	mainDiv.removeEventListener('mousemove', ourPlanMoveOut, true);
	whenOnclick.style.position = 'absolute';
	whenOnclick.style.top = ourplan.imageNode.offsetTop + 'px';
	whenOnclick.style.left = ourplan.imageNode.offsetLeft + 10 + 'px';
	whenOnclick.style.display = 'block';
}
// 定时函数
function begin() {
    box1.style.display = 'none';
    mainDiv.style.display = 'block';
    score.style.display = 'block';
    clear = setInterval(start, 20);
}

addEventListener()

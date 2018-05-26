document.write();
carouselJs();
function carouselJs() {//autocarousel js
	var autocarousel = document.getElementById('autocarousel');
	var particulars = document.getElementById('particulars');
	var autocarouselContainer = document.getElementById('autocarouselContainer');
	var circler = document.getElementById('circler');
	var circlerLi = circler.getElementsByTagName('li');
	var personInfo = document.getElementById('personInfo');
	var personInfoP = personInfo.getElementsByTagName('p');
	var personInfoD = personInfo.getElementsByTagName('div')[0];
	var interestInfo = document.getElementById('interestInfo');
	var interestInfoSpan = interestInfo.getElementsByTagName('span');
	var evaluateInfo = document.getElementById('evaluateInfo');
	var evaluateInfoSpan = evaluateInfo.getElementsByTagName('span');
	var nameSpan = document.getElementById('name').getElementsByTagName('span');
	var mobleTimeS = 0;//Finger to press the
	var mobleTimeM = 0;//Move the fingers
	circleStyle(0);//circler style
	circlerLiBtn();
	function circlerLiBtn () {//circler click
		circlerLi[0].onclick = function () {
			startMove(autocarousel,{left:0});
			circleStyle(0);
		}
		circlerLi[1].onclick = function () {
			startMove(autocarousel,{left:-particulars.offsetWidth});
			circleStyle(1);
		}
		circlerLi[2].onclick = function () {
			startMove(autocarousel,{left:-particulars.offsetWidth*2});
			circleStyle(2);
		}
	}
	autocarouselContainer.onmousedown = function (ev) {//mouse move Corresponding img move 
		var oEvent = ev || event;
		oEvent.preventDefault && oEvent.preventDefault();//Delete the mouse default event.（Drag and drop images）
		this.onmousemove = function (ev) {
			var osEvent = ev || event;
			isMove(oEvent,osEvent);
		}
	};
	autocarouselContainer.onmouseup = function () {
	 	this.onmousemove = null;
	};
	autocarouselContainer.addEventListener("touchstart",function (e) {//phone touch
		moEvent = e.changedTouches[0];//=pc event
	});
	autocarouselContainer.addEventListener("touchmove",function (e) {
		mosEvent = e.changedTouches[0];
	});
	autocarouselContainer.addEventListener("touchend",function (e) {
		isMove(moEvent,mosEvent);
	})
	function circleStyle(num) {
		initAuto(num);
		switch (num){//Other style except the num
			case 0:
				autoStyle(num+1,num+2,num);
				setTimeout(function () {
					personInfoP[0].style.top = particulars.offsetWidth/4 + 'px';
					personInfoP[0].style.opacity = 1;
					personInfoP[0].style.filter = 'alpha(opacity=100)';
					personInfoP[0].style.transitionDuration = '0.5s';
					nameS(2,500,1);
					nameS(0,1300,0.85);
					nameS(1,1900,0.7);
					nameS(3,2500,0.5);
					nameS(4,3000,0.3);
					function nameS(num,time,Duration) {//name everyone move
						setTimeout(function () {
							nameSpan[num].style.left = -particulars.offsetWidth/50 + 'px';
							nameSpan[num].style.opacity = 1;
							nameSpan[num].style.filter = 'alpha(opacity=100)';
							nameSpan[num].style.transitionDuration = Duration + 's';
						},time);
					}
				},700);
				setTimeout(function () {
					personInfoD.style.left = particulars.offsetWidth/1.6 + 'px';
					personInfoD.style.opacity = 1;
					personInfoD.style.filter = 'alpha(opacity=100)';
					personInfoD.style.transitionDuration = '0.5s';
				},500)
				break;
			case 1:
				autoStyle(num-1,num+1,num);
				autoInfoStyle(interestInfo,interestInfoSpan);
				break;
			case 2:
				autoStyle(num-1,num-2,num);
				autoInfoStyle(evaluateInfo,evaluateInfoSpan);
				break;
		}
	}
	function autoInfoStyle(obj,objSpan) {//intere/evaluate info show
		setTimeout(function () {
			obj.style.left = '0';
			obj.style.opacity = 1;
			obj.style.filter = 'alpha(opacity=100)';
			obj.style.transitionDuration = '0.5s';
		},500)
		showInfo(0,1500,0.7);
		showInfo(1,2600,0.9);
		showInfo(2,3700,1);
		showInfo(3,4900,1.1);
		function showInfo(num,time,Duration) {//name everyone move
			setTimeout(function () {
				objSpan[num].style.opacity = 1;
				objSpan[num].style.filter = 'alpha(opacity=100)';
				objSpan[num].style.transitionDuration = Duration + 's';
			},time);
		}
	}
	function autoStyle(first,second,third) {//autocarousel content style
		circlerLi[first].style.background = 'beige';
		circlerLi[first].style.height = circler.getElementsByTagName('li')[0].offsetWidth/8 + 'px';
		circlerLi[second].style.background = 'beige';
		circlerLi[second].style.height = circler.getElementsByTagName('li')[0].offsetWidth/8 + 'px';
	}
	function  isMove(oEvent,osEvent) {//distance the mouse moves.
		if (osEvent.clientX-oEvent.clientX > 100) {
			switch (oEvent.target.id){//Click on the target
				case "particulars": case "name": case "personInfo": case "hint":// = particulars||name||personInfo||hint
					circleStyle(0);
					startMove(autocarousel,{left:0});
					break;
				case "interest": case "interestInfo":
					circleStyle(0);
					startMove(autocarousel,{left:0});
					break;
				case "evaluate": case "evaluateInfo":
					circleStyle(1);
					startMove(autocarousel,{left:-particulars.offsetWidth});
					break;
			};
		} else if(osEvent.clientX-oEvent.clientX < -100) {
			switch (oEvent.target.id){
				case "particulars": case "name": case "personInfo": case "hint":
					circleStyle(1);
					startMove(autocarousel,{left:-particulars.offsetWidth});
					break;
				case "interest": case "interestInfo":
					circleStyle(2);
					startMove(autocarousel,{left:-particulars.offsetWidth*2});
					break;
				case "evaluate": case "evaluateInfo":
					circleStyle(2);
					startMove(autocarousel,{left:-particulars.offsetWidth*2});
					break;
			}
		}
	}
	function initAuto(num) {//init autocarousel style
		circlerLi[num].style.background = 'radial-gradient(transparent,white 70%)';
		circlerLi[num].style.height = circler.getElementsByTagName('li')[0].offsetWidth/3 + 'px';
		personInfoP[0].style.top = -particulars.offsetWidth/6 + 'px';
		personInfoD.style.left = particulars.offsetWidth + 'px';
		personInfoD.style.opacity = 0;
		personInfoD.style.filter = 'alpha(opacity=0)';
		interestInfo.style.left = -particulars.offsetWidth + 'px';
		interestInfo.style.opacity = 0;
		evaluateInfo.style.left = -particulars.offsetWidth + 'px';
		evaluateInfo.style.opacity = 0;
		for (var i = 0; i < nameSpan.length; i++) {
			nameSpan[i].style.left = particulars.offsetWidth/3 + 'px';
			nameSpan[i].style.opacity = 0;
			nameSpan[i].style.filter = 'alpha(opacity=0)';
		}
		for (var i = 0; i < interestInfoSpan.length; i++) {
			interestInfoSpan[i].style.opacity = 0;
			interestInfoSpan[i].style.filter = 'alpha(opacity=0)';
		}
		for (var i = 0; i < evaluateInfoSpan.length; i++) {
			evaluateInfoSpan[i].style.opacity = 0;
			evaluateInfoSpan[i].style.filter = 'alpha(opacity=0)';
		}
	}
}
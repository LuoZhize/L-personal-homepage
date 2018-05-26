document.write();
carouselJs();
homeMainAndNav();
Musicautomatic();
function carouselJs() {//autocarousel js
	var autocarousel = document.getElementById('autocarousel');
	var autoImg = autocarousel.getElementsByTagName('a');
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
					personInfoP[0].style.top = particulars.offsetWidth/6.4 + 'px';
					personInfoP[0].style.opacity = 0.9;
					personInfoP[0].style.filter = 'alpha(opacity=90)';
					personInfoP[0].style.transitionDuration = '0.5s';
					nameS(2,500,1);
					nameS(0,1300,0.85);
					nameS(1,1900,0.7);
					nameS(3,2500,0.5);
					nameS(4,3000,0.3);
					function nameS(num,time,Duration) {//name everyone move
						setTimeout(function () {
							nameSpan[num].style.left = -particulars.offsetWidth/400 + 'px';
							nameSpan[num].style.opacity = 1;
							nameSpan[num].style.filter = 'alpha(opacity=100)';
							nameSpan[num].style.transitionDuration = Duration + 's';
						},time);
					}
				},700);
				setTimeout(function () {
					personInfoD.style.left = particulars.offsetWidth/45 + 'px';
					personInfoD.style.opacity = 1;
					personInfoD.style.filter = 'alpha(opacity=100)';
					personInfoD.style.transitionDuration = '1s';
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
			obj.style.opacity = 1;
			obj.style.filter = 'alpha(opacity=100)';
			obj.style.transitionDuration = '1s';
		},500)
		showInfo(0,800,0.5);
		showInfo(1,1600,0.5);
		showInfo(2,2400,0.5);
		showInfo(3,3200,0.5);
		function showInfo(num,time,Duration) {//intere/evaluate everyone show
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
		setTimeout(function () {
			autoImg[third].style.left = '0';
			autoImg[third].style.opacity = 0.8;
			autoImg[third].style.filter = 'alpha(opacity=80)';
			autoImg[third].style.transitionDuration = '0.5s';
		},500);
	}
	function  isMove(oEvent,osEvent) {//distance the mouse moves.
		osEvent.preventDefault();
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
		autoImg[num].style.left = -particulars.offsetWidth/3 + 'px';
		autoImg[num].style.opacity = 0;
		autoImg[num].style.filter = 'alpha(opacity=0)';
		personInfoP[0].style.top = -particulars.offsetWidth/6 + 'px';
		personInfoD.style.top = particulars.offsetWidth/5.5 + 'px';
		personInfoD.style.left = particulars.offsetWidth/3 + 'px';
		personInfoD.style.opacity = 0;
		personInfoD.style.filter = 'alpha(opacity=0)';
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
function homeMainAndNav() {//ball js
	var product = document.getElementById('product');
	var music = document.getElementById('music');
	var movie = document.getElementById('movie');
	var live = document.getElementById('live');
	var musicD = product.getElementsByTagName('div');
	var nav = document.getElementById('nav');
	var navbar = document.getElementById('navbar');
	var nav_pep = document.getElementById('nav_pep');
	var nav_music = document.getElementById('nav_music');
	var nav_movie = document.getElementById('nav_movie');
	var nav_live = document.getElementById('nav_live');
	var nav_ball = document.getElementById('nav_ball');
	var ballW = nav_ball.offsetWidth;
	var navTime = 0;
	nav_pep.onclick = function () {//switch homepage
		ballSwitch('block','none','none','none');
	}
	nav_music.onclick = function () {//switch musicpage
		ballSwitch('none','block','none','none');
	}
	nav_movie.onclick = function () {//switch moviePage
		ballSwitch('none','none','block','none');
	}
	nav_live.onclick = function () {//switch livePage
		ballSwitch('none','none','none','block');
	}
	function ballSwitch(show1,show2,show3,show4) {
		document.getElementById('homePage').style.display = show1;
		document.getElementById('musicPage').style.display = show2;
		document.getElementById('moviePage').style.display = show3;
		document.getElementById('livePage').style.display = show4;
	}
	Mainbtn(product,music,movie,live);
	Mainbtn(music,product,movie,live);
	Mainbtn(movie,music,product,live);
	Mainbtn(live,product,music,movie);
	function Mainbtn(target1,target2,target3,target4) {
		startMove(product.getElementsByTagName('div')[0],{left:-musicD[0].offsetWidth});
		startMove(product.getElementsByTagName('div')[1],{left:musicD[0].offsetWidth*2});
		target1.onclick = function () {
			startMove(target1.getElementsByTagName('div')[0],{left:-musicD[0].offsetWidth});
			startMove(target1.getElementsByTagName('div')[1],{left:musicD[0].offsetWidth*2});
			startMove(target2.getElementsByTagName('div')[0],{left:0});
			startMove(target2.getElementsByTagName('div')[1],{left:musicD[0].offsetWidth});
			startMove(target3.getElementsByTagName('div')[0],{left:0});
			startMove(target3.getElementsByTagName('div')[1],{left:musicD[0].offsetWidth});
			startMove(target4.getElementsByTagName('div')[0],{left:0});
			startMove(target4.getElementsByTagName('div')[1],{left:musicD[0].offsetWidth});
		}
	}
	nav_ball.onmousedown = function (ev) {
		var oEventD = ev || event;
		oEventD.preventDefault();
		nav.onmouseleave = null;
		document.onmousemove = null;
		document.onmouseup = null;
		navTime++;
		if (navTime%2 != 0) {
			navbar.style.left = ballW/1.3 + 'px';
			navbar.style.transitionDuration = '0.5s';
			setTimeout(function () {
				nav_pep.style.top = -ballW/2.3 + 'px';
				nav_pep.style.left = ballW/2.5 + 'px';
				nav_music.style.top = -ballW/28 + 'px';
				nav_music.style.left = -ballW + 'px';
				nav_movie.style.top = ballW/8 + 'px';
				nav_movie.style.left = -ballW/4 + 'px';
				nav_live.style.top = ballW/2.3 + 'px';
				nav_live.style.left = -ballW/5 + 'px';
			},400)
			setTimeout(function () {
				navA('inline-block');
			},300)
		} else{
			setTimeout(function () {
				ballInit();
			},100)
		}
		document.onmousemove = function (ev) {
			var oEventM = ev || event;
			nav.style.transitionDuration = '0s';
			if (oEventD.clientX - oEventM.clientX >5) {
				ballInit();
				nav.style.top = oEventM.pageY-nav.offsetHeight/2 + 'px';
				nav.style.left = oEventM.pageX-nav.offsetHeight/2+ 'px';
			}
		}
		nav.onmouseleave = function () {
			nav.onmousemove = null;
			setTimeout(function () {
				ballInit();
				setTimeout(function () {
					navbar.style.left = ballW*1.6 + 'px';
					navbar.style.transitionDuration = '1s';
					navTime = 0;
				},200)
			},2500)//leave hide
		}
		document.onmouseup = function () {
			document.onmousemove = null;
			if (nav.offsetLeft < 700) {
				nav.style.left = document.getElementById('homePage').offsetWidth-nav.offsetWidth/2 + 'px';
				nav.style.transitionDuration = '1s';
			}
		}
		
	}
	nav.onmouseenter = function () {
		nav.onmouseleave = null;
		nav_ball.onmousemove = null;
	}
	function ballInit() {
		navTime = 0;
		setTimeout(function () {
			setTimeout(function () {
				navA('none');
			},100)
			nav_pep.style.top = ballW/3.8 + 'px';
			nav_pep.style.left = ballW/3.5 + 'px';
			nav_music.style.top = ballW/3.5 + 'px';
			nav_music.style.left = -ballW/5 + 'px';
			nav_movie.style.top = -ballW/7 + 'px';
			nav_movie.style.left = ballW/3 + 'px';
			nav_live.style.top = -ballW/3 + 'px';
			nav_live.style.left = -ballW/4 + 'px';
		},100)
	}
	function navA(dis) {//show or hide
		nav_pep.style.display = dis;
		nav_music.style.display = dis;
		nav_movie.style.display = dis;
		nav_live.style.display = dis;
	}
	function getTime () {
		var now = new Date();
		return now.getTime();
	}
}
function Musicautomatic() {//slideshow
	var oPrevDiv = document.getElementsByClassName('prev')[0];
	var oNextDiv = document.getElementsByClassName('next')[0];
	var automatic = document.getElementById('automatic');
	var aLi = automatic.getElementsByTagName('li');
	var arr = [];
	for(var i=0;i<aLi.length;i++){
		var oImg = aLi[i].getElementsByTagName('img')[0];
		arr.push( [ parseInt(getStyle(aLi[i],'left')),parseInt(getStyle(aLi[i],'top')),getStyle(aLi[i],'opacity')*100,getStyle(aLi[i],'zIndex') , oImg.width ] );
	}
	oPrevDiv.onclick = function(){  //left
		arr.push(arr[0]);
		arr.shift();
		for(var i=0;i<aLi.length;i++){
			var oImg = aLi[i].getElementsByTagName('img')[0];
			aLi[i].style.zIndex = arr[i][3];
			startMove(aLi[i],{left : arr[i][0] , top : arr[i][1] , opacity : arr[i][2] });
			startMove( oImg,{ width : arr[i][4] } );
		}
	};
	oNextDiv.onclick = function(){  //right
		arr.unshift(arr[arr.length-1]);
		arr.pop();
		for(var i=0;i<aLi.length;i++){
			var oImg = aLi[i].getElementsByTagName('img')[0];
			aLi[i].style.zIndex = arr[i][3];
			startMove(aLi[i],{left : arr[i][0] , top : arr[i][1] , opacity : arr[i][2] });
			startMove( oImg,{ width : arr[i][4] } );
		}
	};
}
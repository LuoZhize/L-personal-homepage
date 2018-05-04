//style函数
function getStyle(obj,attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else{
		return getComputedStyle(obj,false)[attr];
	}
}
//styleMove函数
function startMove(obj,json,endFn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var bBtn = true;
		for(var attr in json){
			var iCur = 0;
			if(attr == 'opacity'){
				if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
				}else{
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
				}
			}else{
				iCur = parseInt(getStyle(obj,attr)) || 0;
			}
			var iSpeed = (json[attr] - iCur)/4;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur!=json[attr]){
				bBtn = false;
			}
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
				obj.style.opacity = (iCur + iSpeed)/100;
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		if(bBtn){
			clearInterval(obj.timer);
			if(endFn){
				endFn.call(obj);
			}
		}
		
	},30);

}
//transform函数
function cssTransform(el, attr, val) {
	if(!el.transform) {
		el.transform = {};
	}
	if(arguments.length > 2) {
		el.transform[attr] = val;
		var sVal = "";
		for(var s in el.transform) {
			switch(s) {
				case "rotate":
				case "skewX":
				case "skewY":
					sVal += s + "(" + el.transform[s] + "deg) ";
					break;
				case "translateX":
				case "translateY":
					sVal += s + "(" + el.transform[s] + "px) ";
					break;
				case "scaleX":
				case "scaleY":
				case "scale":
					sVal += s + "(" + el.transform[s] + ") ";
					break;
			}
			el.style.WebkitTransform = el.style.transform = sVal;
		}
	} else {
		val = el.transform[attr];
		if(typeof val == "undefined") {
			if(attr == "scale" || attr == "scaleX" || attr == "scaleY") {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
	}
}
//变速运动
function speedUp (obj,speed) {
    var startSpeed = obj.offsetWidth;
    var space = Math.abs(obj.offsetWidth-speed);
    startSpeed+=Math.ceil(space/8);
    obj.style.width = startSpeed+"px";
}

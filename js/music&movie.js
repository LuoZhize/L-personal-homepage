//music
document.write();
var jsonURL = 'http://tingapi.ting.baidu.com/v1/restserver/ting';
var song = new Object();
var songPlayList = [];
var music_small,music_author,music_title,timePlay;
var opId = new Array();
var oLrc = document.getElementById('lrc');
var wallLrc = document.getElementById('wallLrc');
var musicValue = document.getElementById('musicValue');
var searchBtn = document.getElementById('searchBtn');
var searchList = document.getElementById('searchList');
~(function(){
	showSongList(1);//show musicList first
	document.getElementById('navBand').addEventListener('click',function(e){
		var el = isTarget(e.target,'navList','A');
		if(!el){
			return;
		}
		if(el.id < 0){//history play
			var data = songPlayList;
			//1. find template
			var listT = document.getElementById('playListT');
			//2. get template's content
			var listTinnerText = listT.innerText;
			//3. use data replace template content
			var dom = doT.template(listTinnerText)(data);
			//4. render page
			document.getElementById('list').innerHTML = dom;
			document.getElementById('list').addEventListener('click',function(e){
				var e = isTarget(e.target,'list','LI');
				if(e){
					playSong(e.id);
					var data = songPlayList;
					var listT = document.getElementById('playListT');
					var listTinnerText = listT.innerText;
					var dom = doT.template(listTinnerText)(data);
					document.getElementById('list').innerHTML = dom;
				}
			});
			return;
		}
		showSongList(el.id);
	});
})()
function showSongList(type){//show music List
	$.get(jsonURL,{
		method: 'baidu.ting.billboard.billList',
		type: type,
		size: '6',
		offset: '0'
	},function(res){
		var data = res.song_list;
		var listT = document.getElementById('listT');
		var listTinnerText = listT.innerText;
		var dom = doT.template(listTinnerText)(data);
		document.getElementById('list').innerHTML = dom;
	},'jsonp');
}
function playSong(id){//play music
	if(song[id]){//history play clickMusic all first
		var n = 0;
		for(var i = 0; i < songPlayList.length; i++){
			if(songPlayList[i].songinfo.song_id == id){
				n = i;
				break;
			}
		}
		songPlayList.push(songPlayList[n]);
		songPlayList.splice(n,1);
		document.getElementById('player').innerHTML = '<audio src="'+song[id]+'" autoplay="autoplay"></audio>';
		return;
	}
	$.get(jsonURL,{
		method: "baidu.ting.song.play",
		songid: id
	},function(res){
		song[id] = res.bitrate.file_link;
		songPlayList[songPlayList.length] = res;
		document.getElementById('player').innerHTML = '<audio src="'+song[id]+'" autoplay="autoplay"></audio>';
		playNavB(res,id);
	},'jsonp');
}
function isTarget(target,pId,tagName){//targrt id name
	while(target.id !== pId){
		if(target.nodeName === tagName){
			return target;
		}
		target = target.parentNode;
	}
	return false;
}

function playNavB(data,id) {//bottom music list
	var music_lrc = "";
	music_small = "";
	music_author = "";
	music_title = "";
	$.get(jsonURL,{
		method: "baidu.ting.song.lry",
		songid: id
	},function(res){
		var re = /\s+/g;//del space
		music_lrc = res.lrcContent.replace(re,"");
		trimLrc(music_lrc);
		music_small = data.songinfo.pic_small;
		music_author = data.songinfo.author;
		music_title = data.songinfo.title;
		document.getElementById('navBottom').innerHTML = '<img src="'+music_small+'"/><span>'+music_title+'</span><span>'+music_author+'</span>';
		document.getElementById('navBottom').addEventListener('click',function(e){
			playSong(id);
		});
	},'jsonp');
}
function trimLrc(res) {//lrc show
	var html;
	var lrcArr = res.split("[");
	for(var i=0 ; i<lrcArr.length ; i++){
        var arr = lrcArr[i].split("]");
        var allTime = arr[0].split(".");
        var time = allTime[0].split(":");
        //get minute second change second
        var timer = time[0]*60 + time[1]*1;
        var text = arr[1];
    	if (text) {//no:null || undefined || NaN
	        opId.push(timer);
    		html += '<p id="'+timer+'">'+text+'</p>';
    	}
   	}
    document.getElementById('lrc').innerHTML = html;
    var i=0;
    oLrc.style.top = -wallLrc.offsetHeight/6+"px";
	function intervalTime() {//recursion function ==== for circulation
	    i++;
	    if(i<opId.length){
    		timePlay = (opId[i]-opId[i-1])*1000+400;
				setTimeout(function () {
					oLrc.style.top = -wallLrc.offsetHeight/5*i+"px";
					oLrc.style.transitionDuration = '0.5s';
					intervalTime();
        		},timePlay)
	    }
	}
	intervalTime();
}
searchBtn.addEventListener('click',function () {//click searchBtn
	searchMusic();
	searchList.style.display = 'block';
})
musicValue.onclick = function () {//click search input
	searchList.style.display = 'none';
}
function searchMusic() {//searchMusic
	$.get(jsonURL,{
		method: "baidu.ting.search.catalogSug",
		query: musicValue.value
	},function(res){
		var data = res.song;
		searchList.innerHTML ='<p id="'+data[0].songid+'" onclick="playSong('+data[0].songid+')">'+data[0].songname+'</p>';
	},'jsonp');
}

//movie
var searchMovie = document.getElementById('searchMovie');
var movieValue = document.getElementById('movieValue');
var playMovie = document.getElementById('playmovie');
var movieInfo = document.getElementById('movieInfo');
var movieList = document.getElementById('movieList');
var movieListBox = document.getElementById('movieListBox');
showMovieList('coming_soon');
searchMovie.onclick = function () {
	movieList.style.display = 'none';
	movieInfo.style.display = 'inline-block';
	var value = movieValue.value;
	$.get('http://op.juhe.cn/onebox/movie/video',{
		key: "fff229cd18d2adc98ec676f3aa1ad37b",
		q: value
	},function(reason){
		var data = reason.result;
		movieInfo.innerHTML = '<img src="'+data.cover
		+'" onclick = "'+playmovie(data.playlinks.qq)
		+'"></img><div><p>'+data.title
		+'</p><p>类型：'+data.tag
		+'</p><p>主演：'+data.dir
		+'</p><p>时间：'+data.year
		+'</p><pre>简介：'+data.desc
		+'</pre></div>';
	},'jsonp');
}
document.getElementById('movieNav').addEventListener('click',function (e) {
	movieList.style.display = 'inline-block';
	movieInfo.style.display = 'none';
	var e = isTarget(e.target,'movieNav','LI');
	showMovieList(e.id);
});
document.getElementById('movieList').addEventListener('click',function (e) {
	var e = isTarget(e.target,'movieList','LI');
	$.get('https://api.douban.com/v2/movie/subject/'+e.id,{
	},function(reason){
		movieInfo.innerHTML = '<img src="'+reason.images.small
		+'"</img><div><p>'+reason.title
		+'</p><p>类型：'+reason.genres
		+'</p><p>主演：'+reason.casts[0].name
		+'</p><p>时间：'+reason.year
		+'</p><pre>简介：'+reason.summary
		+'</pre></div>';
	},'jsonp');
	movieList.style.display = 'none';
	movieInfo.style.display = 'inline-block';
});
function showMovieList(e) {
	$.get('https://api.douban.com/v2/movie/'+e,{
		city:"北京",
		start: 0,
		count:14
	},function(key){
		var data = key.subjects;
		var listT = document.getElementById('movieListT');
		var listTinnerText = listT.innerText;
		var dom = doT.template(listTinnerText)(data);
		document.getElementById('movieList').innerHTML = dom;
	},'jsonp');
}
function isTarget(target,pId,tagName){//targrt id name
	while(target.id !== pId){
		if(target.nodeName === tagName){
			return target;
		}
		target = target.parentNode;
	}
	return false;
}
function playmovie(res) {
	$(this).load(res);
}
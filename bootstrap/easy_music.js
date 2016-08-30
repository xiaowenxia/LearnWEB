$(function(){
	$("#btn-play").on("click",function(){$("#audio_xx").trigger('play');});
	$("#btn-pre").on("click",function(){$("#audio_xx").trigger('play');});
	$("#btn-next").on("click",function(){$("#audio_xx").trigger('play');});
	$("#btn-pause").on("click",function(){$("#audio_xx").trigger('pause');});

});
function play_music(value){
	//alert(value);
	//audio = document.getElementById("audio");
	//audio.src = value;
	//audio.play();

	$("#audio_xx").prop("src",value)
	$("#audio_xx").trigger('play');

	//获取文件名，去掉路径
	name = value.substr(value.lastIndexOf('/')+1);  
	$("#rmusic").html(name);
}
function download_music(value){
	$("#first").load("src", value);
}
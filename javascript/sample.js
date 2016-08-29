function browser_info() {
	 // body...  
	 var browser = navigator.appName;
	 var browser_version = navigator.appVersion;
	 document.getElementById("display_browser").innerHTML = "浏览器名称：" + browser + "<br>浏览器版本：" + browser_version;
}
function alert_message(){
	alert("I am alert_message() in sample.js");
}
function alert_click(){
	alert("I am alert_message() in sample.js");
	document.getElementById("alert_input").value="你被警告了";
}
function confirm_click(){
	var result = confirm("确认显示“我”，取消显示“你”");
	if(result)
	{
		document.getElementById("confirm_input").value="我";
	}else{
		document.getElementById("confirm_input").value="你";
	}
}
function prompt_click(){
	var name = prompt("请输入你的名字");

	document.getElementById("prompt_input").value="你好 "+name;
}
function data_click () {
	document.getElementById("timedisplay_input").value=Date();
}
function display_text() {
	 /* body... */ 
	 document.getElementById("display_text").innerHTML="fdsafdsaf";
}
function display_old() {
	 /* body... */ 
	 document.getElementById("display_text").innerHTML="鼠标移动到这里";
}

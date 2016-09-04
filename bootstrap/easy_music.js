function create_music_obj(name, album, length, path, operation){
    var music_obj = new Object();
    music_obj.name = name;
    music_obj.album = album;
    music_obj.length = length;
    music_obj.operation = operation;
    music_obj.path = path;
    music_obj.info = function(){
        console.log("path:" + music_obj.path + "\nname:" + music_obj.name + "\nalbum:" + music_obj.album + "\nlength:" + music_obj.length);
    }
    return music_obj;
}

$(function(){
	$("#btn-play").on("click",function(){$("#audio_xx").trigger('play');});
	$("#btn-pre").on("click",function(){$("#audio_xx").trigger('play');});
	$("#btn-next").on("click",function(){$("#audio_xx").trigger('play');});
	$("#btn-pause").on("click",function(){$("#audio_xx").trigger('pause');});
    music_all = {
        music_obj:[
            {
                name: "稻香", 
                album: "《魔杰座》",
                length: "03:43",
                path: "music/稻香.mp3",
                hot: '5'
            },
            {
                name: "青花瓷", 
                album: "《我很忙》",
                length: "03:57",
                path: "music/青花瓷.mp3",
                hot: '2'
            },
            {
                name: "晴天", 
                album: "《叶惠美》",
                length: "04:30",
                path: "music/晴天.mp3",
                hot: '2'
            },
            {
                name: "听妈妈的话", 
                album: "依然范特西",
                length: "04:23",
                path: "music/听妈妈的话.mp3",
                hot: '3'
            },
            {
                name: "七里香", 
                album: "《七里香》",
                length: "04:58",
                path: "music/七里香.mp3",
                hot: '2'
            },
        ]
    };
    var i = 0;
    for (i = 0; i < music_all.music_obj.length; i++)
    {
        $("#music_idx").append("<tr class='warning'><td Title='" + music_all.music_obj[i].name + "'><button id='btn_link_" + i + "' type='text' class='btn btn-link'>" + music_all.music_obj[i].name + "</button></td>" +
                            "<td>" + music_all.music_obj[i].album + "</td>" +
                            "<td style='text-align:center'>" + music_all.music_obj[i].length + "</td>" +
                            "<td style='text-align:center'><img src='icons/signal_" + music_all.music_obj[i].hot + ".png' style='height:20px'></td>" +
                            "<td><button type='text' onClick='play_music(this.value)'' value='" + music_all.music_obj[i].path +"' class='btn btn-success'>播放</button>" +
                            "<button type='text' class='btn btn-primary'>下载</button></td></tr>");
    }           
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



/**
 * An audio spectrum visualizer built with HTML5 Audio API
 * Author:Wayou
 * License:feel free to use but keep refer pls!
 * Feb 15, 2014
 * For more infomation or support you can :
 * view the project page:https://github.com/Wayou/HTML5_Audio_Visualizer/
 * view online demo:http://wayou.github.io/HTML5_Audio_Visualizer/
 */
window.onload = function() {
    new Visualizer().ini();
};
var Visualizer = function() {
    this.file = null; //the current file
    this.fileName = null; //the current file name
    this.audioContext = null;
    this.source = null; //the audio source
    //this.info = document.getElementById('info').innerHTML; //this used to upgrade the UI information
    this.info = null;
    this.infoUpdateId = null; //to sotore the setTimeout ID and clear the interval
    this.animationId = null;
    this.status = 0; //flag for sound is playing 1 or stopped 0
    this.forceStop = false;
    this.allCapsReachBottom = false;
    this.music_buffer = null;
};
Visualizer.prototype = {
    ini: function() {
        this._prepareAPI();
        this._addEventListner();
    },
    _prepareAPI: function() {
        //fix browser vender for AudioContext and requestAnimationFrame
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
        try {
            this.audioContext = new AudioContext();
        } catch (e) {
            this._updateInfo('!Your browser does not support AudioContext', false);
            console.log(e);
        }
    },
    _addEventListner: function() {
        var that = this,
        	audioInput = document.getElementsByClassName("btn btn-link"),
            dropContainer = document.getElementsByTagName("canvas")[0];
        //listen the file upload
        audioInput[0].onclick = 
        audioInput[1].onclick = 
        audioInput[2].onclick = 
        audioInput[3].onclick = 
        audioInput[4].onclick = function() {
            that.fileName = this.value;
            //document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Uploading', true);
            //once the file is ready,start the visualizer
            that._start();
        };
        //listen the drag & drop
        dropContainer.addEventListener("dragenter", function() {
            document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Drop it on the page', true);
        }, false);
        dropContainer.addEventListener("dragover", function(e) {
            e.stopPropagation();
            e.preventDefault();
            //set the drop mode
            e.dataTransfer.dropEffect = 'copy';
        }, false);
        dropContainer.addEventListener("dragleave", function() {
            document.getElementById('fileWrapper').style.opacity = 0.2;
            that._updateInfo(that.info, false);
        }, false);
        dropContainer.addEventListener("drop", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (that.audioContext===null) {return;};
            document.getElementById('fileWrapper').style.opacity = 1;
            that._updateInfo('Uploading', true);
            //get the dropped file
            that.file = e.dataTransfer.files[0];
            if (that.status === 1) {
                document.getElementById('fileWrapper').style.opacity = 1;
                that.forceStop = true;
            };
            that.fileName = that.file.name;
            //once the file is ready,start the visualizer
            that._start();
        }, false);
    },
    _loadSound: function(url) {
    	var that = this;
	    var request = new XMLHttpRequest(); //建立一个请求
	    request.open('GET', url, true); //配置好请求类型，文件路径等
	    request.responseType = 'arraybuffer'; //配置数据返回类型
	    // 一旦获取完成，对音频进行进一步操作，比如解码
	    request.onload = function() {
	         that.music_buffer = request.response;
	    }
	    request.send();
	},
    _start: function() {
        //read and decode the file into audio array buffer 
        var that = this,
            file = this.file;
        that._loadSound(that.fileName);
        //that._visualize(that.audioContext, that.music_buffer);
        that.audioContext.decodeAudioData(that.music_buffer, function(buffer) {
            that._updateInfo('Decode succussfully,start the visualizer', true);
            that._visualize(that.audioContext, buffer);
        }, function(e) {
            that._updateInfo('!Fail to decode the file', false);
            console.log(e);
        });
        //     fr = new FileReader();
        // fr.onload = function(e) {
        //     console.log(e.target.result);
        //     var fileResult = e.target.result;
        //     var audioContext = that.audioContext;
        //     if (audioContext === null) {
        //         return;
        //     };
        //     that._updateInfo('Decoding the audio', true);
        //     audioContext.decodeAudioData(fileResult, function(buffer) {
        //         that._updateInfo('Decode succussfully,start the visualizer', true);
        //         that._visualize(audioContext, buffer);
        //     }, function(e) {
        //         that._updateInfo('!Fail to decode the file', false);
        //         console.log(e);
        //     });
        // };
        // fr.onerror = function(e) {
        //     that._updateInfo('!Fail to read the file', false);
        //     console.log(e);
        // };
        // //assign the file to the reader
        // this._updateInfo('Starting read the file', true);
        // fr.readAsArrayBuffer(file);
    },
    _visualize: function(audioContext, buffer) {
        var audioBufferSouceNode = audioContext.createBufferSource(),
            analyser = audioContext.createAnalyser(),
            that = this;
        //connect the source to the analyser
        audioBufferSouceNode.connect(analyser);
        //connect the analyser to the destination(the speaker), or we won't hear the sound
        analyser.connect(audioContext.destination);
        //then assign the buffer to the buffer source node
        audioBufferSouceNode.buffer = buffer;
        //play the source
        if (!audioBufferSouceNode.start) {
            audioBufferSouceNode.start = audioBufferSouceNode.noteOn //in old browsers use noteOn method
            audioBufferSouceNode.stop = audioBufferSouceNode.noteOff //in old browsers use noteOff method
        };
        //stop the previous sound if any
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.source !== null) {
            this.source.stop(0);
        }
        audioBufferSouceNode.start(0);
        this.status = 1;
        this.source = audioBufferSouceNode;
        audioBufferSouceNode.onended = function() {
            that._audioEnd(that);
        };
        this._updateInfo('Playing ' + this.fileName, false);
        this.info = 'Playing ' + this.fileName;
        //document.getElementById('fileWrapper').style.opacity = 0.2;
        this._drawSpectrum(analyser);
    },
    _drawSpectrum: function(analyser) {
        var that = this,
            canvas = document.getElementById('canvas'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 10, //width of the meters in the spectrum
            gap = 2, //gap between meters
            capHeight = 2,
            capStyle = '#fff',
            meterNum = 800 / (10 + 2), //count of the meters
            capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
        ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        var drawMeter = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            if (that.status === 0) {
                //fix when some sounds end the value still not back to zero
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = 0;
                };
                allCapsReachBottom = true;
                for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                    allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
                };
                if (allCapsReachBottom) {
                    cancelAnimationFrame(that.animationId); //since the sound is stoped and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                    return;
                };
            };
            var step = Math.round(array.length / meterNum); //sample limited data from the total array
            ctx.clearRect(0, 0, cwidth, cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                };
                ctx.fillStyle = capStyle;
                //draw the cap, with transition effect
                if (value < capYPositionArray[i]) {
                    ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                } else {
                    ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                };
                ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
            }
            that.animationId = requestAnimationFrame(drawMeter);
        }
        this.animationId = requestAnimationFrame(drawMeter);
    },
    _audioEnd: function(instance) {
        if (this.forceStop) {
            this.forceStop = false;
            this.status = 1;
            return;
        };
        this.status = 0;
        var text = 'HTML5 Audio API showcase | An Audio Viusalizer';
        //document.getElementById('fileWrapper').style.opacity = 1;
        //document.getElementById('info').innerHTML = text;
        instance.info = text;
        //document.getElementById('uploadedFile').value = '';
    },
    _updateInfo: function(text, processing) {
        var infoBar = document.getElementById('info'),
            dots = '...',
            i = 0,
            that = this;
        infoBar.innerHTML = text + dots.substring(0, i++);
        if (this.infoUpdateId !== null) {
            clearTimeout(this.infoUpdateId);
        };
        if (processing) {
            //animate dots at the end of the info text
            var animateDot = function() {
                if (i > 3) {
                    i = 0
                };
                //infoBar.innerHTML = text + dots.substring(0, i++);
                that.infoUpdateId = setTimeout(animateDot, 250);
            }
            this.infoUpdateId = setTimeout(animateDot, 250);
        };
    }
}

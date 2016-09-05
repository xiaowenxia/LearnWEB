var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();

var WIDTH = 800;
var HEIGHT = 600;
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;

//var canvasCtx = canvas_obj.getContext('2d');
// draw an oscilloscope of the current audio source

var request = new XMLHttpRequest(); //建立一个请求
var music_buffer;
request.open('GET', "music/稻香.mp3", true); //配置好请求类型，文件路径等
request.responseType = 'arraybuffer'; //配置数据返回类型
// 一旦获取完成，对音频进行进一步操作，比如解码
request.onload = function() {
      music_buffer = request.response;
}
request.send();

var dataArray   = new Uint8Array(music_buffer);

//var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);
var canvas=document.getElementById('id_canvas');
var canvasCtx=canvas.getContext('2d');

var waveform = new WaveformData(music_buffer);
function draw() {

      drawVisual = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      console.log(dataArray);

      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

      canvasCtx.beginPath();

      var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;

      for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
    };
draw();
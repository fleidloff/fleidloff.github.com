$(function() {
	init();
	plotData();
});

var init = function() {
	g = $('#canvas')[0].getContext("2d");
	WIDTH = $("#canvas").width();
	HEIGHT = $("#canvas").height();
};

var g, WIDTH, HEIGHT;
var myColor = ["#D3BC48","#D95B43","#C02942","#542437","#53777A"];
var myData = [10,10,10,10,10];

function getTotal(){
	var myTotal = 0;
	for (var j = 0; j < myData.length; j++) {
		myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
	}
	return myTotal;
};
var lastend, g;
function plotData(angle) {
	var canvas;
	lastend = (lastend ? lastend : 0) - (angle ? angle : 0);
	var myTotal = getTotal();

	canvas = document.getElementById("canvas");
	g = canvas.getContext("2d");
	g.lineWidth = 3;
	g.strokeStyle = "white";
	g.clearRect(0, 0, canvas.width, canvas.height);
	//g.moveTo(WIDTH,HEIGHT);
	//g.moveTo(WIDTH,HEIGHT);
    //g.rotate(90 * Math.PI / 180);


	for (var i = 0; i < myData.length; i++) {
		g.fillStyle = myColor[0];
		g.beginPath();
		g.moveTo(WIDTH/2,HEIGHT/2);
		g.arc(WIDTH/2,HEIGHT/2,200,lastend,lastend+
		  (Math.PI*2*(myData[i]/myTotal)),false);
		g.lineTo(WIDTH/2,HEIGHT/2);
		g.fill();
		g.stroke();
		lastend += Math.PI*2*(myData[i]/myTotal);
	}
};

function clear() {
	g.fillStyle = "#fff";
	g.fillRect(0, 0, WIDTH, HEIGHT);
};
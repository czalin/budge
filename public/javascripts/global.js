// DOM Ready ============================================================
$(document).ready(function() {
	makeCanvas();
	drawCircle($("#circleCanvas")[0]);
});

$(window).resize(function() {
});

// Functions ============================================================
function makeCanvas() {
	var newCanvas = document.createElement('canvas');
	newCanvas.id = "circleCanvas";
	$('#wrapper').before(newCanvas);

	$("#circleCanvas").width(500);
	$("#circleCanvas").height($("#circleCanvas").width());

	$("#circleCanvas")[0].width = $("#circleCanvas").width();
	$("#circleCanvas")[0].height = $("#circleCanvas").height();
}

function drawCircle(canvas) {
	var lineWidth = Math.min($(window).width(), $(window).height()) * 0.025;

	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, (canvas.width/2)-(lineWidth), 0, 2 * Math.PI, false);
	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(canvas.width/2, canvas.height/2, (canvas.width/2)-(lineWidth/2), 0, 2 * Math.PI, false);
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = 'rgba(255,255,255,0.25)';
	ctx.stroke();
	ctx.closePath();
}
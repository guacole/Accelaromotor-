

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Accelerometer Javascript Test</title>
<meta name="viewport" content="width=device-width,user-scalable=yes" />
<style>
body {
	font-family: helvetica, arial, sans serif;
}
#sphere {
	position: absolute;	
	width: 50px;
	height: 50px;
	border-radius: 50px;
	-webkit-radius: 50px;
	background-color: blue;
}
</style>
</head>

<body>
<div id="content">
    <h1>Accelerometer Javascript Test</h1>
    <br>
    <h2>Run this on your phone</h2>
    <div id="sphere"></div>
<ul>
	<li>acceleration x: <span id="accelerationX"></span>g</li>
	<li>acceleration y: <span id="accelerationY"></span>g</li>
	<li>acceleration z: <span id="accelerationZ"></span>g</li>
	<li>rotation alpha: <span id="rotationAlpha"></span>degree</li>
	<li>rotation beta: <span id="rotationBeta"></span>degree</li>
	<li>rotation gamma: <span id="rotationGamma"></span>degree</li>
</ul>

test: <span id="test"></span>
</div>
<script type="text/javascript">

var x = 0, y = 0,
    vx = 0, vy = 0,
	ax = 0, ay = 0;
	
var sphere = document.getElementById("sphere");

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
		ax = event.accelerationIncludingGravity.x * 5;
		ay = event.accelerationIncludingGravity.y * 5;
		if (e.accelerationIncludingGravity.x < 3) {
			document.body.style.backgroundColor = "red";
		}
		else {
             document.body.style.backgroundColor = "white";
         }
		document.getElementById("accelerationX").innerHTML = e.accelerationIncludingGravity.x;
		document.getElementById("accelerationY").innerHTML = e.accelerationIncludingGravity.y;
		document.getElementById("accelerationZ").innerHTML = e.accelerationIncludingGravity.z;

		if ( e.rotationRate ) {
			document.getElementById("rotationAlpha").innerHTML = e.rotationRate.alpha;
			document.getElementById("rotationBeta").innerHTML = e.rotationRate.beta;
			document.getElementById("rotationGamma").innerHTML = e.rotationRate.gamma;
		}		
	}

	setInterval( function() {
		var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
		if ( landscapeOrientation) {
			vx = vx + ay;
			vy = vy + ax;
		} else {
			vy = vy - ay;
			vx = vx + ax;
		}
		vx = vx * 0.98;
		vy = vy * 0.98;
		y = parseInt(y + vy / 50);
		x = parseInt(x + vx / 50);
		
		boundingBoxCheck();
		
		sphere.style.top = y + "px";
		sphere.style.left = x + "px";
		
	}, 25);
} 


function boundingBoxCheck(){
	if (x<0) { x = 0; vx = -vx; }
	if (y<0) { y = 0; vy = -vy; }
	if (x>document.documentElement.clientWidth-20) { x = document.documentElement.clientWidth-20; vx = -vx; }
	if (y>document.documentElement.clientHeight-20) { y = document.documentElement.clientHeight-20; vy = -vy; }
	
}

</script>

</body>
</html>

(function () {
	'use strict';
	
	var _drawCircle = function (ctx, options) {
		  ctx.beginPath();
	    ctx.arc(options.x, options.y, options.radius, 0, Math.PI * 2);
	    ctx.fillStyle = options.style;

	    if (options.fill) {
	        ctx.fill();
	    } else {
	        ctx.stroke();
	    }
	}

	Number.prototype.toRadians = function () {
		return (Math.PI / 180) * this;
	}

	var shapes = {
		square: function (canvas) {
			var context = canvas.getContext('2d');
			context.fillRect(50, 25, 100, 100);
		},
		circle: function (canvas) {
		    var context = canvas.getContext('2d');

		    var options = {
		        x: 75,
		        y: 75,
		        radius: 40,
            fill: true,
		        style: '#4cff00' // green
		    };

		    _drawCircle(context, options);
		},
		star: function (canvas) {
			var context = canvas.getContext('2d');

			// star fill-style
			context.fillStyle = "red";

			// shadow settings
			context.shadowColor = "#000000";
			context.shadowOffsetX = 6;
			context.shadowOffsetY = 6;
			context.shadowBlur = 9;

			//draw the star
			context.beginPath();
			context.moveTo(107.8, 0.0);
			context.lineTo(141.2, 67.5);
			context.lineTo(215.7, 78.3);
			context.lineTo(161.8, 130.9);
			context.lineTo(174.5, 205.1);
			context.lineTo(107.8, 170.1);
			context.lineTo(41.2, 205.1);
			context.lineTo(53.9, 130.9);
			context.lineTo(0.0, 78.3);
			context.lineTo(74.5, 67.5);
			context.lineTo(107.8, 0.0);
			context.closePath();
			context.fill();

		},
		smiley: function (canvas) {
			var context = canvas.getContext('2d');
						
			context.translate(25, 25); //move the center point (0,0) of our canvas down 25px and over 25px

			// set some stroke properties, including a linear gradient for the line color

			var lingrad = context.createLinearGradient(0, 0, 0, 150);
			lingrad.addColorStop(0, '#00ABEB');
			lingrad.addColorStop(0.5, '#CCC');
			lingrad.addColorStop(0.5, '#26C000');
			lingrad.addColorStop(1, '#CCC');

			context.strokeStyle = lingrad;
			context.lineWidth = 7;

			context.beginPath();
			context.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
			context.moveTo(110, 75);
			context.arc(75, 75, 35, 0, Math.PI, false);   // Mouth
			context.moveTo(65, 65);
			context.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
			context.moveTo(95, 65);
			context.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
			context.stroke();

			context.fillStyle = lingrad;
			context.font = "24pt Arial";
			context.fillText('Hi There', 15, 15);
		},
		arc: function (canvas) {
			var context = canvas.getContext('2d');
			var startAngle = 30;
			var endAngle = 220;

			context.lineCap = 'round'; // available options are 'round', 'butt' (default) and 'square'
			context.lineWidth = 15;
			context.arc(100, 60, 50, startAngle.toRadians(), endAngle.toRadians());
			context.stroke();
		},
		curves: function (canvas) {
			var context = canvas.getContext('2d');

			context.translate(-15, 50);

			context.fillStyle = "red";
			// Bezier curves (two control points)
			context.moveTo(75, 40);
			context.bezierCurveTo(75, 37, 70, 25, 50, 25);
			context.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
			context.bezierCurveTo(20, 80, 40, 102, 75, 120);
			context.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
			context.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
			context.bezierCurveTo(85, 25, 75, 37, 75, 40);
			context.fill();

			context.translate(75, -80);

			// Quadratric curves (one control point)
			context.lineWidth = 5;
			context.beginPath();
			context.moveTo(75, 25);
			context.quadraticCurveTo(25, 25, 25, 62.5);
			context.quadraticCurveTo(25, 100, 50, 100);
			context.quadraticCurveTo(50, 120, 30, 125);
			context.quadraticCurveTo(60, 120, 65, 100);
			context.quadraticCurveTo(125, 100, 125, 62.5);
			context.quadraticCurveTo(125, 25, 75, 25);
			context.stroke();

			context.font = "16pt Arial";
			context.fillText('Hi There', 35, 65);
		},
		image: function (canvas, imgPath) {
			var context = canvas.getContext('2d');
			var img = new Image();
			img.onload = function () {
				context.drawImage(img, 15, 15);
			};
			img.src = imgPath;
		},
		animation: function (canvas) {
			var context = canvas.getContext('2d');
			var x = 75;
			var y = 75;
			var dx = 2;
			var dy = 4;

			//draw a circle
			setInterval(function () {
				context.clearRect(0, 0, 200, 175);
				context.beginPath();
				context.arc(x, y, 20, 0, Math.PI * 2, true);
				context.closePath();
				context.fill();

				// logic to make sure the ball bounces off the walls instead of running off the screen
				if (x + dx > 200 || x + dx < 0)
					dx = -dx;
				if (y + dy > 175 || y + dy < 0)
					dy = -dy;

				x += dx;
				y += dy;
			}, 10);
		}
	};

	document.shapeFactory = shapes;
})();
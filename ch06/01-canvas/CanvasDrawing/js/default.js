(function () {
    "use strict";

   var app = WinJS.Application;

    app.onactivated = function (eventObject) {
    	var shapeFactory = document.shapeFactory;

    	// draw a square in the first canvas
    	var canvasOne = document.querySelector('#one');
    	shapeFactory.square(canvasOne);

      //draw a circle in the second canvas
    	var canvasTwo = document.querySelector('#two');
    	shapeFactory.circle(canvasTwo);

      //draw a star with shadow in the third canvas
    	var canvasThree = document.querySelector('#three');
    	shapeFactory.star(canvasThree);

			//draw a smiley face in the fourth canvas
    	var canvasFour = document.querySelector('#four');
    	shapeFactory.smiley(canvasFour);

    	//draw an arc in the fifth canvas
    	var canvasFive = document.querySelector('#five');
    	shapeFactory.arc(canvasFive);

    	//draw a speech bubble, heart and text in the sixth canvas
    	var canvasSix = document.querySelector('#six');
    	shapeFactory.curves(canvasSix);

    	//draw an image in the seventh canvas
    	var canvasSeven = document.querySelector('#seven');
    	shapeFactory.image(canvasSeven, '/images/bsatrom-kendo.png');

    	//draw a bounding ball in the eighth canvas
    	var canvasEight = document.querySelector('#eight');
    	shapeFactory.animation(canvasEight);
    };

    app.start();
})();

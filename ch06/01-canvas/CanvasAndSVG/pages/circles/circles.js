// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var _svgTimer, _canvasTimer;

    function setColors(stops) {
        var i, length;
        var colors = [];

        for (i = 0, length = stops.length; i < length; i++) {
            colors.push(stops[i].attributes['stop-color'].value);
        }

        return colors;
    }

    function shimmer(stops) {
        var i, length;
        var stopColors = setColors(stops);

        for (i = 0, length = stops.length; i < length; i++) {
            stops[i].attributes['stop-color'].value = stopColors[i === 2 ? 0 : i + 1];
        }
    }

    function manipulateSVGCircle() {
        var stops = document.querySelectorAll('#circleGrad stop');
        _svgTimer = setInterval(function () { shimmer(stops); }, 300);
    }

    function shift(colorStops) {
        var firstItem = colorStops.shift();
        colorStops.push(firstItem);

        return colorStops;
    }

    function createCanvasCircle(colorStops) {
        var ctx = document.querySelector('#circleCanvas').getContext('2d');
        var x, y, radius;
        x = y = 225;
        radius = 135;

        var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colorStops[0]);
        gradient.addColorStop(.5, colorStops[1]);
        gradient.addColorStop(1, colorStops[2]);

        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        //Stoke outside border of circle
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 20;
        ctx.stroke();
    }

    function manipulateCanvasCircle() {
        var colorStops = ["rgb(255, 255, 255)", "rgb(140, 140, 140)", "rgb(55, 55, 55)"];

        _canvasTimer = setInterval(function () {
            createCanvasCircle(colorStops);
            colorStops = shift(colorStops);
        }, 300);
    }

    function ready(element, options) {
        manipulateSVGCircle();
        manipulateCanvasCircle();
    }

    WinJS.UI.Pages.define("/pages/circles/circles.html", {
       ready: ready
    });
})();

// clockControl.js
// Based on code from http://scurker.com/blog/2010/04/javascript-clock-using-html5-and-canvas/
(function () {
  "use strict";

  // the hard way
  //window.Samples = {};
  //window.Samples.UI = {};
  //window.Samples.UI.ClockControl = function(element, options) { ... };

  // the easy way
  WinJS.Namespace.define("Samples.UI", {
    ClockControl: WinJS.Class.define(function (element, options) {
      // set up well-known properties
      element.winControl = this;
      this.element = element;

      // parse the options
      WinJS.UI.setOptions(this, options);

      // create the drawing surface
      var canvas = document.createElement("canvas");
      element.appendChild(canvas);
      this._ctx = canvas.getContext("2d");

      // draw the clock now and every second
      setTimeout(this._tick.bind(this), 0);
      setInterval(this._tick.bind(this), 1000);
    },
  {
    color: "black",
    width: { get: function () { return this.element.clientWidth; } },
    height: { get: function () { return this.element.clientHeight; } },
    radius: { get: function () { var r = Math.min(this.width, this.height) / 2 - 5; return r < 0 ? 0 : r; } },

    _tick: function () {
      var now = new Date();
      var sec = now.getSeconds();
      var min = now.getMinutes();
      var hour = now.getHours() % 12;

      // resize as the control resizes
      this._ctx.canvas.width = this.width;
      this._ctx.canvas.height = this.height;

      // draw the face and the hands
      this._drawFace();
      this._drawHand(sec * Math.PI / 30, 2, this.radius * 0.90);
      this._drawHand((min + sec / 60) * Math.PI / 30, 8, this.radius * 0.75);
      this._drawHand((hour + sec / 3600 + min / 60) * Math.PI / 6, 8, this.radius * 0.50);

      // fire the 5-second event
      if (sec % 5 == 0) {
        this.dispatchEvent("fiveseconds", { when: now });
      }
    },

    _drawFace: function () {
      this._ctx.clearRect(0, 0, this.width, this.height);
      this._ctx.beginPath();
      this._ctx.lineWidth = 5;
      this._ctx.arc(this.width / 2, this.height / 2, this.radius, 0, 2 * Math.PI, false);
      this._ctx.strokeStyle = this.color;
      this._ctx.stroke();
    },

    _drawHand: function (radians, thickness, length) {
      radians -= 90 * Math.PI / 180;

      this._ctx.save();
      this._ctx.beginPath();
      this._ctx.translate(this.width / 2, this.height / 2);

      this._ctx.strokeStyle = this.color;
      this._ctx.lineWidth = thickness;
      this._ctx.lineCap = "round";
      this._ctx.rotate(radians);
      this._ctx.moveTo(0, 0);
      this._ctx.lineTo(length, 0);

      this._ctx.stroke();
      this._ctx.restore();
    },
  })
  });

  // add event support to ClockControl
  WinJS.Class.mix(Samples.UI.ClockControl, WinJS.UI.DOMEventMixin);
  WinJS.Class.mix(Samples.UI.ClockControl, WinJS.Utilities.createEventProperties("fiveseconds"));
})();

(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/htmlControls/htmlControls.html", {
    ready: function (element, options) {
      var context = canvas1.getContext("2d");
      var gradient = context.createLinearGradient(0, 0, 300, 0);
      gradient.addColorStop(0, "black");
      gradient.addColorStop(1, "red");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 100, 100);
    },
  });
})();

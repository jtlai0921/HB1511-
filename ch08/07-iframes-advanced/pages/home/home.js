// home.js
(function () {
  "use strict";

  WinJS.UI.Pages.define("/pages/home/home.html", {
    ready: function (element, options) {
      portlandButton.onclick = function () { setLocation(45.523452, -122.676207); };
      bostonButton.onclick = function () { setLocation(42.358431, -71.059773); };
      sofiaButton.onclick = function () { setLocation(42.696492, 23.326011); };
    },
  });

  function setLocation(lat, long) {
    document.frames["mapFrame"].postMessage(JSON.stringify({ lat: lat, long: long }), "ms-appx-web://" + document.location.host);
  }

})();

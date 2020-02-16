(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/htmlControls/htmlControls.html", {
        ready: function (element, options) {
          var iframe = document.querySelector('iframe');
          iframe.src = "../nonMetro.html";
        }
    });
})();

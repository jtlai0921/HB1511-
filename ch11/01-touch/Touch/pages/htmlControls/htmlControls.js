(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/htmlControls/htmlControls.html", {
      ready: function (element, options) {
        var email = document.querySelector('[type=email]');
        new WinJS.UI.Tooltip(email, { innerHTML: "<h2>Did <i>you</i> know that dogs and bees can smell <span style='color: red'>FEAR</span>!</h2>" });

        var iframe = document.querySelector('iframe');
        iframe.src = "../nonMetro.html";
      }
    });
})();

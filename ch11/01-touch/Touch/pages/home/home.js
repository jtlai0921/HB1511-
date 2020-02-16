(function () {
    "use strict";

    function linkClickEventHandler(eventInfo) {
      eventInfo.preventDefault();
      var link = eventInfo.target;
      WinJS.Navigation.navigate(link.href);
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: function (element, options) {
          WinJS.Utilities.query("a").listen("click", linkClickEventHandler, false);
        }
    });
})();

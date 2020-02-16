(function () {
    "use strict";

    function linkClickEventHandler(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate(link.href);
    }

    function ready(element, options) {
        WinJS.Utilities.query("a").listen("click", linkClickEventHandler, false);
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        ready: ready
    });
})();

(function () {
    "use strict";

    function ready(element, options) {
        var main = document.querySelector('.fragment');
        var video = document.querySelector('video');
        WinJS.UI.Animation.enterPage([[main], [video]], null);
    }

    WinJS.UI.Pages.define("/pages/styledVideo/styledVideo.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: ready
    });
})();

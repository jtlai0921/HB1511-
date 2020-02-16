// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function ready(element, options) {
        var main = document.querySelector('.fragment');
        var video = document.querySelector('video');
        WinJS.UI.Animation.enterPage([[main], [video]], null);
    }

    WinJS.UI.Pages.define("/pages/embeddedVideo/embeddedVideo.html", {
       ready: ready
    });
})();

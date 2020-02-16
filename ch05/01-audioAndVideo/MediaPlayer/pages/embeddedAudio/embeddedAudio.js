// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function ready(element, options) {
        var main = document.querySelector('.fragment');
        var audio = document.querySelector('audio');
        WinJS.UI.Animation.enterPage([[main], [audio]], null);
    }

    WinJS.UI.Pages.define("/pages/embeddedAudio/embeddedAudio.html", {
        ready: ready
    });
})();

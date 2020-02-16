(function () {
    "use strict";

    function ready(element, options) {
        var main = document.querySelector('.fragment');
        var video = document.querySelector('video');
        WinJS.UI.Animation.enterPage([[main], [video]], null);

        var flip = document.querySelector('#flip');
        flip.addEventListener('click', function () {
            video.msHorizontalMirror = true;
        });

        var zoom = document.querySelector('#zoom');
        zoom.addEventListener('click', function () {
            video.msZoom = true;
        });

        var fill = document.querySelector('#fill');
        fill.addEventListener('click', function () {
            video.parentElement.style.width = "100%";
            video.parentElement.style.height = "100%";
            video.style.width = "100%";
            video.msZoom = true;
        });

        var clear = document.querySelector('#clear');
        clear.addEventListener('click', function () {
            video.msClearEffects();

            video.msHorizontalMirror = false;
            video.msZoom = false;
            video.msContentZoomFactor = 1;
        });
    }

    WinJS.UI.Pages.define("/pages/extendedVideo/extendedVideo.html", {
       ready: ready
    });
})();

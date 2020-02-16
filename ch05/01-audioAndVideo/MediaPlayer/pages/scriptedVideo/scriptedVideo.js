// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    function adjustVolume(video, newVolume) {
        var currentVolume = document.querySelector('#currentVolume');

        video.volume = parseInt(newVolume) / 10;
        currentVolume.innerText = newVolume;
    }

    function ready(element, options) {
        var main = document.querySelector('.fragment');
        var video = document.querySelector('video');
        WinJS.UI.Animation.enterPage([[main], [video]], null);

        var video = document.querySelector('video');
        var volSlider = document.querySelector('#volSlider');
        var mute = document.querySelector('#mute');

        adjustVolume(video, volSlider.value);
        volSlider.addEventListener('change', function () {
            adjustVolume(video, volSlider.value);
        });

        video.addEventListener('click', function () {
            video.paused ? video.play() : video.pause();
        });

        mute.addEventListener('click', function () {
            adjustVolume(video, 0);
            volSlider.value = 0;
        });
    }

    WinJS.UI.Pages.define("/pages/scriptedVideo/scriptedVideo.html", {
        ready: ready
    });
})();

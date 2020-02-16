(function () {
    "use strict";

    var mediaControls;

    function playPause() { };

    function play() {
    	var audio = document.querySelector('audio');
    	audio.play();

    	mediaControls.isPlaying = true;

    	var artist = document.getElementById('artist');
    	var track = document.getElementById('track');

    	artist.innerHTML = mediaControls.artistName;
    	track.innerHTML = mediaControls.trackName;
    };

    function stop() { };
    function pause() { };
    
    function playing() { };
    function paused() { };
    function songEnded() { };

    function ready(element, options) {
        var main = document.querySelector('.fragment');
        var audio = document.querySelector('audio');
        WinJS.UI.Animation.enterPage([[main], [audio]], null);

        mediaControls = Windows.Media.MediaControl;

        mediaControls.addEventListener("playpausetogglepressed", playPause, false);
        mediaControls.addEventListener("playpressed", play, false);
        mediaControls.addEventListener("stoppressed", stop, false);
        mediaControls.addEventListener("pausepressed", pause, false);

        // Audio tag specific event listeners.
        audio.addEventListener("playing", playing, false);
        audio.addEventListener("pause", paused, false);
        audio.addEventListener("ended", songEnded, false);

        mediaControls.isPlaying = false;

        audio.msAudioCategory = "BackgroundCapableMedia";
        audio.src = "/audio/paintFumes-TeenageBrainDrain.mp3";
    }

    WinJS.UI.Pages.define("/pages/backgroundAudio/backgroundAudio.html", {
        ready: ready
    });
})();

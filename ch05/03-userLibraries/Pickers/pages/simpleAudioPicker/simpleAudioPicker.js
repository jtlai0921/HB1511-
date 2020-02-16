(function () {
    "use strict";

    var MediaControls;

    function pickAudio() {
        var targetAudio = document.querySelector('audio#target');

        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.musicLibrary;
        picker.fileTypeFilter.replaceAll([".mp3", ".wav"]);

        picker.pickSingleFileAsync().then(function (file) {
            if (file) {
                var objUrl = window.URL.createObjectURL(file);

                //targetAudio.msAudioCategory = "BackgroundCapableMedia";
                targetAudio.src = objUrl;

                file.properties.getMusicPropertiesAsync().then(function (musicProperties) {
                    MediaControls.trackName = musicProperties.title;
                    MediaControls.artistName = musicProperties.artist;
                });
            }
        });

        targetAudio.addEventListener('playing', playing, false);
        targetAudio.addEventListener('pause', paused, false);
        targetAudio.addEventListener('ended', ended, false);
    }

    function play() {
        var audio = document.querySelector('audio');
        audio.play();
    }

    function pause() {
        var audio = document.querySelector('audio');
        audio.pause();
    }

    function playpausetoggle() {
        var audio = document.querySelector('audio');
        if (MediaControls.isPlaying === true) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    function playing() {
        MediaControls.isPlaying = true;
    }

    function paused() {
        MediaControls.isPlaying = false;
    }

    function ended() {
        MediaControls.isPlaying = false;
    }

    function ready(element, options) {
        var pick = document.querySelector('#pickAudio');

        pick.addEventListener('click', pickAudio);

        // Assign the button object to MediaControls
        MediaControls = Windows.Media.MediaControl;

        // Add event listeners for the buttons
        MediaControls.addEventListener("playpressed", play, false);
        MediaControls.addEventListener("pausepressed", pause, false);
        MediaControls.addEventListener("playpausetogglepressed", playpausetoggle, false);
    }

    WinJS.UI.Pages.define("/pages/simpleAudioPicker/simpleAudioPicker.html", {
        ready: ready
    });
})();

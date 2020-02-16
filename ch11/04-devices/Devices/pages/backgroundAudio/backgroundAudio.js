// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var mediaControls, audio;

    function playSong() {
      audio.play();
    }

    function pauseSong() {
      audio.pause();
    }

    function playpauseSong() {
      if (mediaControls.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }

    function stopSong() {
      audio.pause();
    }

    function setupBackgroundAudio() {
      mediaControls = Windows.Media.MediaControl;
      audio = document.getElementById('backgroundMusic');

      // Add event listeners for the buttons
      mediaControls.addEventListener('playpressed', playSong);
      mediaControls.addEventListener('pausepressed', pauseSong);
      mediaControls.addEventListener('playpausetogglepressed', playpauseSong);
      mediaControls.addEventListener('stoppressed', stopSong);
      mediaControls.artistName = "Paint Fumes";
      mediaControls.trackName = "Teenage Brain Drain";

      audio.addEventListener('playing', function () {
        mediaControls.isPlaying = true;
      });

      audio.addEventListener('pause', function () {
        mediaControls.isPlaying = false;
      });

      audio.addEventListener('ended', function () {
        mediaControls.isPlaying = false;

        mediaControls.removeEventListener('playpressed', playSong);
        mediaControls.removeEventListener('pausepressed', pauseSong);
        mediaControls.removeEventListener('playpausetogglepressed', playpauseSong);
        mediaControls.removeEventListener('stoppressed', stopSong);
      });

      audio.src = "audio/paintFumes-TeenageBrainDrain.mp3";
      audio.disabled = false;

      mediaControls.isPlaying = false;
    }

    WinJS.UI.Pages.define("/pages/backgroundAudio/backgroundAudio.html", {
        ready: function (element, options) {
          setupBackgroundAudio();
        }
    });
})();

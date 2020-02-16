(function () {
    'use strict';
    var mediaElement;

    window.playToInit = function () {
        var video, image, playToManager;

        video = document.querySelector('#targetVideo');
        image = document.querySelector('#targetImage');

        video.addEventListener('loadstart', function () { mediaElement = this; }, false);
        image.addEventListener('load', function () { mediaElement = this; }, false);

        playToManager = Windows.Media.PlayTo.PlayToManager.getForCurrentView();
        playToManager.addEventListener('sourcerequested', startPlayTo, false);
    }

    function startPlayTo(e) {
        var request = e.sourceRequest;
        var controller = mediaElement.msPlayToSource;

        request.setSource(controller);
    }
})();
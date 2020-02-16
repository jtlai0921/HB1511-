(function () {
    "use strict";

    function captureCamera() {
        var targetImage = document.querySelector('#targetImage');
        var targetVideo = document.querySelector('#targetVideo');

        window.image = targetImage;
        window.video = targetVideo;

        var captureUI = new Windows.Media.Capture.CameraCaptureUI();
        captureUI.photoSettings.format = Windows.Media.Capture.CameraCaptureUIPhotoFormat.png;
        captureUI.photoSettings.croppedAspectRatio = { width: 4, height: 3 };

        captureUI.videoSettings.format = Windows.Media.Capture.CameraCaptureUIVideoFormat.mp4;
        captureUI.videoSettings.maxDurationInSeconds = 30;

        captureUI.captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo).then(function (capturedFile) {
            if (capturedFile) {
                var objURL = URL.createObjectURL(capturedFile);

                if (capturedFile.fileType === ".png") {
                    targetImage.src = objURL;
                } else {
                    targetVideo.src = objURL;
                }
            }
        });
    };

    function ready(element, options) {
        var takePicture = document.querySelector('#takePicture');
        var targetImage = document.querySelector('#targetImage');
        var targetVideo = document.querySelector('#targetVideo');

        takePicture.addEventListener('click', captureCamera);
        targetImage.addEventListener('load', function () {
            WinJS.UI.Animation.fadeIn(this);
        });
        targetVideo.addEventListener('loadstart', function () {
            WinJS.UI.Animation.fadeIn(this);
        });

        //Initialize PlayTo
        playToInit();
    }

    WinJS.UI.Pages.define("/pages/cameraCapture/cameraCapture.html", {
        ready: ready
    });
})();
